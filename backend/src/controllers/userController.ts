import { ProductType } from "./../models/productModel";

import { NextFunction, Request, RequestHandler, Response } from "express";
import { productModel } from "../models/productModel";
import { ErrorHandler } from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";

import userModel, { UserTypeForCretaingSchema } from "../models/userModel";
import { sendToken } from "../utils/sendToken";
import { sendEmail } from "../utils/sendEmail";
import crypto from "crypto";
import cloudinary from 'cloudinary'

export const createNewUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email, name, images } = req.body;
  console.log("hereeeeeeee");
let result 
if(images){
   result = await cloudinary.v2.uploader.upload(JSON.parse(images), {
    folder: "avatar",
    width: 150,
    crop: "scale",
  })
}

console.log(password, email, name,result);
    const user = await userModel.create({
      password,
      email,
      name,
      // avatar: {
      //   public_id: "samnpele id",
      //   url: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // },
      avatar: {
        public_id: result?.public_id,
        url:result?.url
      },
    });

    if (!user) {
      return next(new ErrorHandler("user not createed", 409));
    }
 
    sendToken(user, 201, res, "new user created successfully");
    // const token = user.getJWTToken()

    // res.status(201).json({
    //   success: true,
    //   user,
    //   message: "new user is created",
    //   token,
    // });
  }
);

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // console.log("hereeeeee")
    if (!email || !password) {
      return next(new ErrorHandler("incorrent email or password", 404));
    }
    const user = await userModel
      .findOne({ email: email })
      .select("+password")
      .exec();

    // console.log(user)

    if (!user) {
      return next(new ErrorHandler("incorrent email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    console.log("isPasswordMatched", isPasswordMatched);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("incorrent email or password", 401));
    }

    
    sendToken(user, 200, res,`login as ${user.name} successfull`);
    // const token = user.getJWTToken()
    //     res.status(200).json({
    //       success: true,
    //       user,
    //       token

    //     });
  }
);

export const logout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "logged out",
    });
  }
);

export const forgotPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetPassordPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : =\n\n ${resetPassordPasswordUrl}  \n\n if 
     you have not requeseted this email please ignore this`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Ecommerce password recovery",
        message: message,
      });
      res.status(200).json({
        success: true,
        message: `email send to ${user.email}  successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler((error as Error).message, 500));
    }
  }
);

export const resetPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const resetPasswordTokenFromUrl: string =
      req.params.resetPasswordTokenFromUrl;
    //  console.log(resetPasswordTokenFromUrl)

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetPasswordTokenFromUrl)
      .digest("hex");
    console.log(resetPasswordToken);
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("user in resetpassword", user);
    if (!user) {
      return next(new ErrorHandler("resetPassword token has expire", 401));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("passwords dont match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res, "password reset successfully");
  }
);

export const getLoggedInUserrDetails = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.user._id==", req.user._id);
    const user = await userModel.findById(req.user._id);
    if(!user){
      return next(new ErrorHandler("no user found ", 404))
    }

    res.status(200).json({
      success: true,
      user,
      message:`logged in as ${user.name!} `,
    });
  }
);

export const changeToNewPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("req.user._id==",req.user._id)
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword ||
      confirmPassword !== newPassword
    ) {
      return next(new ErrorHandler("passordds dont match", 404));
    }

    const user = await userModel.findById(req.user._id).select("+password");
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    console.log("oldpassword==", oldPassword);
    const isPasswordMatched = await user.comparePassword(String(oldPassword));
    console.log("isPasswordMatched==", isPasswordMatched);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("old password does not match", 404));
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res, "password changed successfully");
  }
);

export const updateUserProfile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let isImageChanged = req.body.isImageChanged
    let imagesFromFrontEnd = JSON.parse(req.body.images)

  let user
   let result 
     if(isImageChanged ===  "true"){
     user = await userModel.findById(req.user._id );
    if(!user){
      return next(new ErrorHandler("user with the id not found", 404))
    }
    let existingImagesInUser = user?.avatar?.url

     if(imagesFromFrontEnd !== existingImagesInUser){
        await cloudinary.v2.uploader.destroy(user.avatar?.public_id!).then((res)=>{
          console.log(res);
        })
        result = await cloudinary.v2.uploader.upload(imagesFromFrontEnd, {
          folder: "avatar",
          width: 150,
          crop: "scale",
        })
     }else{
       result = user.avatar
      
     } 
     
     }

    
      



    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      avatar:result
      
      
    };

    // const user = await userModel.findById(req.user._id );


     user = await userModel.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
      message: "user updated successfully",
    });
  }
);



export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
 

    const allUsers= await userModel.find()
    const totalNumberOfUsers = allUsers.length

    res.status(200).json({
      success: true,
      allUsers,
      totalNumberOfUsers
    });
  }
);


export const getUserDetailsForAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
 
    const user = await userModel.findById(req.params.id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);



export const updateUserRoleByAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      // name: req.body.name,
      // email: req.body.email,
      role:req.body.role==="user"?"admin":"user" 
    };

    // const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    //   new: true,
    //   runValidators: true,
    // });


    const user = await userModel.findById(req.params.id );
    if(!user){
      return next(new ErrorHandler(`cannot find user with id ${req.params.id}`, 404))
    }
     if(user.role==="admin"){
     user.role  = "user"
     }else{
      user.role  = "admin"
     }
     await user.save()
    res.status(200).json({
      success: true,
      user,
      message: `user with id== ${req.params.id} role updated successfully`,
    });
  }
);


export const deleteUserByAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
 
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler(`user with id ==${req.params.id}`, 404));
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message:`user with id ==${req.params.id} deleted successfully`,
    });
  }
);