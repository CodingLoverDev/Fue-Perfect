declare global {
    namespace NodeJS {
        interface ProcessEnv {
            COOKIE_SECRET: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
        }
    }
}

export {};
