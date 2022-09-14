import { NextApiHandler } from 'next';
import { decode, sign } from 'jsonwebtoken';
import { google } from 'googleapis';
import { week } from '../../../util/authorize';

const isDev = process.env.NODE_ENV !== 'production';

interface GoogleJWT {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    hd: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    iat: number;
    exp: number;
}

// eslint-disable-next-line consistent-return
const authenticate: NextApiHandler = async (req, res): Promise<void> => {
    if (req.method === 'GET') {
        // Get Refresh Token
        const { host } = req.headers;
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `http${isDev ? '' : 's'}://${host}/api/google/callback`
        );

        const { tokens } = await oauth2Client.getToken(req.query.code as string);

        // Validate
        if (!tokens.scope || !tokens.refresh_token || !tokens.id_token) return res.status(400).send('Missing Tokens: ID or Refresh Token');
        if (
            !tokens.scope?.includes('https://mail.google.com/') ||
            !tokens.scope?.includes('https://www.googleapis.com/auth/userinfo.email')
        )
            return res.status(400).send('Missing Scope: Mail or Userinfo');

        const user = decode(tokens.id_token) as GoogleJWT;

        // Generate JWT
        const jwt = sign({ sub: user.sub, email: user.email, rt: tokens.refresh_token }, process.env.COOKIE_SECRET);

        // Set cookie & send response
        const cookie = [`fp-google=${jwt}`, 'Path=/', `Max-Age=${week}`, 'SameSite=Strict', 'HttpOnly'];

        if (!isDev) cookie.push('Secure', `Domain=${req.headers.host}`);

        res.setHeader('set-cookie', cookie.join(';'));
        res.redirect('/login?navigate=/');
        // eslint-disable-next-line consistent-return
        return;
    }
    return res.status(405).send('Method Not Allowed');
};

export default authenticate;
