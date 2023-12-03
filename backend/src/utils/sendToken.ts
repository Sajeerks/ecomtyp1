import { Response } from "express";
// import userModel, { UseSchemaMethods ,UserTypeForCretaingSchema, } from "../models/userModel";

// export const sendToken =(user:  UserTypeForCretaingSchema & UseSchemaMethods , statusCode:number, res:Response, message:string = "token send") =>{

export const sendToken =(user:  any, statusCode:number, res:Response, message:string = "token send") =>{
    const token = user.getJWTToken()
    console.log("token in send token ", token);
// type sameSiteSTatus = 'boolean | "none" | "lax" | "strict" | undefined'
    const options = {
        expires: new Date(
          Date.now() +Number( process.env.COOKIE_EXPIRE! )* 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure : true,
        sameSite:"none" as "none"
    
      
      };
  
     console.log("user in send token ===",user)
    //  const userName= user.name
  
      
      res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message:message
      });

}