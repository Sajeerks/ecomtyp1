import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import Stripe from "stripe";

export const processPayment  = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
  
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const myPayment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"inr",
            metadata:{
                company:"sajeerEcom",

            },

        })
   console.log(myPayment.client_secret);

      res.status(200).json({
        success: true,
        client_secret:myPayment.client_secret
        
      });
    }
  );


  

  
export const sendStripeApiKey  = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
  

        console.log(process.env.STRIPE_API_KEY);

      res.status(200).json({
        success: true,
        stripeApikey:process.env.STRIPE_API_KEY
        
      });
    }
  );

