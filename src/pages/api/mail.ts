import { NextApiHandler } from 'next';
import NodeMailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import { Message, message } from '../../data/schemas';
import authorize from '../../util/authorize';

// eslint-disable-next-line consistent-return
const mail: NextApiHandler = async (req, res): Promise<void> => {
    if (req.method === 'POST') {
        // Authenticate
        const auth = authorize(req.cookies);
        if (!auth) return res.status(401).send('Unauthenticated');

        // Validate
        const validation = message.validate(req.body);
        if (validation.error) return res.status(400).json({ name: validation.error.name, message: validation.error.message });
        const { credentials, subject }: Message = validation.value;
        const { content }: Message = validation.value;

        // Create Transport
        const transport = NodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: auth.email,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: auth.rt
            }
        });

        transport.use('compile', inlineBase64());

        // Send
        const err = await new Promise<Error | null>(resolve => {
            const options: Mail.Options = {
                from: auth.email,
                to: credentials.recipient,
                subject,
                html: content
            };
            transport.sendMail(options, resolve);
        });

        if (err) return res.status(500).send({ name: 'Fout', message: err.message });
        return res.status(200).send('OK');
    }
    return res.status(405).send('Method Not Allowed');
};

export default mail;
