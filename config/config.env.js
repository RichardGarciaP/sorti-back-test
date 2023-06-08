if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TOKEN_DURATION: process.env.JWT_TOKEN_DURATION,
    DATABASE:process.env.DATABASE,
    DATABASE_USER:process.env.DATABASE_USER,
    DATABASE_PASSWORD:process.env.DATABASE_PASSWORD,
    DATABASE_HOST:process.env.DATABASE_HOST
}