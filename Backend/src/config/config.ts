import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number (process.env.SERVER_PORT) : 7777;


export const config = {
    server: {
        port: SERVER_PORT
    }
}