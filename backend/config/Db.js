
// const mysql = require("mysql2");

// const Pool= mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"root123",
//     database:"clientManagement"
// })

// module.exports = Pool;

// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();
// async function connection(){
//     const mongod= await MongoMemoryServer.create();
//     const getUri=mongod.getUri();

//     mongoose.set('stictQuery',true);
//     const db=await mongoose.connect(process.env.ATLAS_URI);
//     console.log('Database Connected');
//     return db;

// }

// export default connection;

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connection() {
    let dbUri = process.env.ATLAS_URI;

    // Use in-memory MongoDB if ATLAS_URI is not provided
    if (!dbUri) {
        const mongod = await MongoMemoryServer.create();
        dbUri = mongod.getUri();
    }

    mongoose.set('strictQuery', true);
    try {
        const db = await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

export default connection;


