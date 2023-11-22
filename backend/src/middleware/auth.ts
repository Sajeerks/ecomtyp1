import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { catchAsyncErrors } from "./catchAsyncErrors";
import { ErrorHandler } from '../utils/errorHandler';
import userModel, { userModelCompleteType } from '../models/userModel';


interface JwtPayload {
    id: string
  }

//   declare module "express" { 
//     export interface Request {
//       user: any
//     }
//   }
  
export const isAuthenticatedUser = catchAsyncErrors(async(req:Request, res:Response, next:NextFunction)=>{
    const {token} = req.cookies

    // console.log("tokenf for  authjs==" + token)
 if(!token){
    return next(new ErrorHandler("please login to view the resource", 401))
 }

 const {id} = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload


//  const deockeddata= jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
//  type deocdeddataType = typeof deockeddata
//  type tokenType = typeof jwt

//  const iddd:string = deockeddata.id

 req.user= await userModel.findById(id)
 

  next()

})

export const authorizedRoles=(...roles:string[]) =>{
    return (req:Request, res:Response, next:NextFunction)=>{
          if( !roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role -${req.user.role} is not authorized see this resource`, 401))
          }

          next()
    }
}