import { Sequelize } from "sequelize";
import {debug} from 'console'


// const sequelize = new Sequelize('sql7603424', 'sql7603424', 'D5FyPRGU1b', {
//     host:'sql7.freesqldatabase.com',
//     dialect: 'mysql'
// });

const pswd = process.env.DEV_PASSWORD
const host = process.env.DEV_HOST

// console.log(host,pswd)
const sequelize = new Sequelize('smart_job', 'root', 'Password@11', {
    host:'127.0.0.1',
    dialect: 'mysql'
});

const checkConnection = async ()=> {
    try {
        await sequelize.authenticate();
        debug(`DB connected successfully`)
    } catch (error) {
        debug('Unable to connect to the DB')
    }
}

checkConnection()

export default sequelize;