import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import notifier from 'node-notifier'
import Responses from './utils/Responses';
import userRoute from './routes/userRoute';
import jobRoute from './routes/jobRoute';
import { debug } from 'console';
import sequelize from './utils/database';
import serviceRoute from './routes/serviceRoute';

require('dotenv').config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors())

// Express configuration
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// Express multer configuration for the file upload

const errorNotification = (err, str, req) => {
    const title = `Error in ${req.method} ${req.url}`

    notifier.notify({
        title,
        msg: str
    })
}

if(!isProduction){
    app.use(errorHandler({log:errorNotification}))
    app.use(morgan('dev'))    
}

const apiVersion = '/api/v1'

app.use(apiVersion, userRoute)
app.use(apiVersion, jobRoute)
app.use(apiVersion, serviceRoute)

app.get('/', (req, res) => {
    Responses.setSuccess(200, 'Welcome to your smart job portal');
    Responses.send(res)
})

app.all('/*', (req, res)=>{
    Responses.setError(404, 'The requested url was not found on this server')
    Responses.send(res)
})

if(!isProduction){
    app.use((err, req, res) => {
        debug(err.stack)

        res.status(err.status || 500)

        res.json({
            error: {
                message: err.message,
                error:err
            }
        })
    })
}

const sync = async () => await sequelize.sync();
sync()


const server = app.listen(process.env.PORT||3000, ()=> {
    debug(`Listen on port ${server.address().port}`)
})

export default server;
