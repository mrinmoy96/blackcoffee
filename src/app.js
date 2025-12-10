import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app= express();

app.use(cors(
	{origin:process.env.CORS_ORIGIN ,
	 credentials:true	
	}//here we give domain accept, othes are blocked

));


app.use(express.json({
	limit:'16kb'
}));
app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

//router import
import userRoutes from "./routes/user.routes.js";

app.get('/', (req,res)=>{
	res.send('Hello World')
})

app.use('api/v1/users', userRoutes)
export {app}