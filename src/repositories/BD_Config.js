import 'dotenv/config';
export const Bd_config = {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    user: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE
};