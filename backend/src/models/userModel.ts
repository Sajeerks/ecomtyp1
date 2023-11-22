import mongoose, { InferSchemaType } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import  jwt from "jsonwebtoken";
import { Model, Schema, model } from 'mongoose';
import { Document } from 'mongoose';
import { NextFunction } from "express";
import crypto from 'crypto'


// user:    typeof mongoose.Schema.ObjectId;
export interface UserTypeForCretaingSchema  
    {
        name: string;
        email: string;
        password: string;
        role: string;
        
    
        resetPasswordExpire?: Date | undefined;
        avatar?: {
            public_id: string;
            url: string;
        } | undefined;
        resetPasswordToken?: string | undefined;
    }


   export interface UseSchemaMethods {
        getJWTToken(): string,
        comparePassword(enteredPassword :string):Promise<boolean>
        getResetPasswordToken():string,
      }




      export type UserModeType = Model<UserTypeForCretaingSchema, {}, UseSchemaMethods>;








const userSchema = new mongoose.Schema<UserTypeForCretaingSchema,UserModeType ,UseSchemaMethods>({
    name:{type:String,
        required:[true, "please enter your username"],
        maxLength:[10, "please enter a name less than 10 characters"], 
        minlength:[3, "please enter a name greater than 3 characters"],
         
     
    }, 
    email:{
        type:String,
        unique:true,
        required:[true, "please enter an email"],
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
    
        required:[true, "please enter an passwoed"],
        minlength:[3, "please enter a password greater than 8 characters"],
        select:false

    }, 
    avatar:{
        "public_id":{ type: String, required: true },
        "url":{ type: String, required: true },
       
    },
    role:{
        type:String, 
        default:"user"
    },
  

    resetPasswordToken:{type:String},
    resetPasswordExpire:Date,


})



userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET!,{
        expiresIn:process.env.JWT_EXPIRE!
    })
}


userSchema.methods.comparePassword = async function(enteredPassword :string):Promise<boolean>{
    console.log("enteredPassword ==",enteredPassword)

 return await bcrypt.compare(enteredPassword , this.password)

}


userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000
    return resetToken
    
    //hasing
}


const userModelComplete = mongoose.model<UserTypeForCretaingSchema,UserModeType>("userModel", userSchema)
export type userModelCompleteType = typeof userModelComplete

export type userInferedType = mongoose.InferSchemaType<typeof userModelComplete>

export default mongoose.model<UserTypeForCretaingSchema,UserModeType>("userModel", userSchema)


// export type UserType = typeof userSchema
//  type UserType = InferSchemaType<typeof userSchema>;
// export interface UserType   extends  Document
//     {
//         name: string;
//         email: string;
//         password: string;
//         role: string;
//         resetPasswordExpire?: Date | undefined;
//         avatar?: {
//             public_id: string;
//             url: string;
//         } | undefined;
//         resetPasswordToken?: string | undefined;
//     }


//     interface UseSchemaMethods {
//         getJWTToken(): string;
//       }