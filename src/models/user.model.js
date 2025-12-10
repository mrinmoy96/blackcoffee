import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema=new Schema(
	{
		username:{
			type:String,
			required:true,
			unique:true,
			lowercase:true,
			trim:true,
			index:true
		},
		email:{
			type:String,
			required:true,
			unique:true,
			lowercase:true,
			trim:true,	
		},
		fullname:{
			type:String,
			required:true,
			lowercase:true,
			index:true
		},
		avatar:{
			type:String,//cloudinary url
			required:true,
		},
		coverImage:{
			type:String,//cloudinary url
		},
		watchHistory:[
			{
				type:Schema.Types.ObjectId,
				ref:'Video'
			}
		],
		password:{
			type:String,
			required:[true,'Password is required'],
		},
		refereshToken:{
			type:String,
		}
	},{ timestamps:true }
);

userSchema.pre('save', async function(next){//here function used not arrow function because we need this keyword
	if(!this.modifiedPaths('password'))return next();//if password is not modified then just call next

	this.password=await bcrypt.hash(this.password, 10);//hash the password with bcrypt
	next();
})//pre save is mongoose middleware, before saving the user this function will run


userSchema.methods.isPasswordCorrect=async function(password){
	return await bcrypt.compare(password, this.password);
}

export const User=mongoose.model("User",userSchema);