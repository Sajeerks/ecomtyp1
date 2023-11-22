import { ErrorHandler } from "../utils/errorHandler";
import {NextFunction, Request, Response} from 'express'

export const ErrorMiddleWare =(err:Error, req:Request, res:Response, next:NextFunction):void=>{



    if(err.name === "CastError"){
       const message =  `Resource not found Invalid , ${err}`
       err = new ErrorHandler(message, 400)
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400);
    }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }



//   err = err || 500 
  err.message = err.message || "internal server error"
   console.log("errro console form erroMaker")
   console.log(err.message)
   console.log(err.name)
   res.status(new ErrorHandler(err.message,500).statusCode).json({
    sucess:false,
    error:err.stack,

   
  })
}
