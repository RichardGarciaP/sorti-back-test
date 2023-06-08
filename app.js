const express = require('express');

const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const {NODE_ENV} = require('./config/config.env')
const todoRoutes = require('./routes/todo.routes')
const authRoutes = require('./routes/auth.routes')


const errorMiddleware = require('./middleware/error.middleware')

const isProduction = NODE_ENV === 'production';

const router = express.Router();
const app = express()

app
    .use(cors())
    .use(helmet())
    .use(express.json())

if(!isProduction){
    app.use(morgan('dev'))
}

router
    .use('/user', authRoutes)
    .use('/todo', todoRoutes);


app.use('/api/v1', router)
app.use(errorMiddleware)


module.exports = app;