
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connection from './config/Db.js';
import router from './Routes/Route.js'
const app= express();

// middlewaeres

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
dotenv.config();

const PORT = process.env.PORT ||8181;

app.get('/',(req,res)=>{
    res.status(201).json("Home get request");
})


// api Routes

app.use('/api',router)

connection().then(()=>{
    try{
        app.listen(PORT, ()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })

    }catch(error){
      console.log('Cannot connected to the server');
    }
}).catch(error =>{
    console.log("invalid database connection....!");
}

);