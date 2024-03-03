import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();

// middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//option 1:Allow all origins with default of cors(*)
app.use(cors());
//option 2: allow custom origins
// app.use(
//     core({
//     origin:'http://localhost:3000',
//     mehtods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
//     })
// );

app.get("/",(req,res)=>{
    res.send("Welcome to my app");
});

app.use('/books',booksRoute);  //express with prefix books will be handled by bookRoute

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("app connected to databse successfully");
        app.listen(PORT,()=>{
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });