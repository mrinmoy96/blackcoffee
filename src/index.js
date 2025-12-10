// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// require('dotenv').config({path: './env'})
import express from 'express';
import dotenv from "dotenv"
import connectDB from "./db/index.js";


const app = express();

// import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed Mrinmoy!!! ", err);
})










/*
import express from "express";
const app = express();

(async()=>{
	try{
		await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
		app.on("error",(error)=>{
			console.log("Error connecting to DB",error);
			throw error;
		})
		console.log("Connected to DB successfully");
		app.listen(process.env.port,()=>{
			console.log(`Server is running on port ${process.env.PORT}`);
		})
	}
	catch(err){
		console.log("Error connecting to DB",err);
	}
})()
*/