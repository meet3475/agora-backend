const mongoose = require('mongoose');
require('dotenv').config()

const dataBase = async () => {
    try{
        const URL = process.env.MONGO_URL;

        if(URL) {await mongoose.connect(URL); console.log('Database connected');}
        else console.log('No URL provided');
    } catch(error) {
        console.log(error.message);
    }
}

module.exports = dataBase;