import express from "express";
import {isAuthenticatedUser } from "../middleware/auth";
import { processPayment ,sendStripeApiKey} from "../controllers/paymentController";

export const paymentRouter = express.Router();


paymentRouter.route("/payment/process").post(isAuthenticatedUser,processPayment);
paymentRouter.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey);




