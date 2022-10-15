import dotenv from 'dotenv';
dotenv.config();

const constant = {
    db: {
        development: process.env.DB_STRING_DEV!,
        production: process.env.DB_STRING_PROD!,
        test: process.env.DB_STRING_TEST!,
    },
    env: process.env.NODE_ENV!,
    jwtSecret: process.env.JWT_SECRET,
    port:  parseInt(process.env.PORT!)|| 3000
}

export default constant; 