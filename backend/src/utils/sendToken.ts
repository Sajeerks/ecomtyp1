import { Response } from "express";
import userModel, { UseSchemaMethods ,UserTypeForCretaingSchema, } from "../models/userModel";

export const sendToken =(user:  UserTypeForCretaingSchema & UseSchemaMethods , statusCode:number, res:Response, message:string = "token send") =>{
    const token = user.getJWTToken()

    const options = {
        expires: new Date(
          Date.now() +Number( process.env.COOKIE_EXPIRE! )* 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
  
     console.log("user in send token ===",user)
     const userName= user.name
  
      
      res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message:message
      });

}