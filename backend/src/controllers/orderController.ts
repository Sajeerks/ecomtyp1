import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { OrderMethods, orderModel } from "../models/orderModel";
import { ErrorHandler } from "../utils/errorHandler";
import mongoose from "mongoose";
import { productModel } from "../models/productModel";


export const createNewOrder = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
  
const {
    shippingInfo, 
orderItems,
paymentInfo, 
itemPrice,
taxPrice,
shippingPrice,
totalPrice

} = req.body

const newOrder = await orderModel.create({
    shippingInfo, 
    orderItems,
    paymentInfo, 
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id,

})
  
  
       
      res.status(201).json({
        success: true,
        newOrder,
        message: "new order is created",
      });
    }
  );


  

  
export const getSingleOrder = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
  

const singleOrder = await orderModel.findById(req.params.orderId)
  
  if(!singleOrder){
    return next(new ErrorHandler("the order withthe id is not found", 404))
  }
       
      res.status(200).json({
        success: true,
        singleOrder,
        message: "new order is created",
      });
    }
  );


  

    
export const getMyOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {


const myOrders = await orderModel.find({user:req.user._id})

if(!myOrders){
  return next(new ErrorHandler("the order withthe id is not found", 404))
}
     const  myOrdersCount = myOrders.length
    res.status(200).json({
      success: true,
      myOrders,
      myOrdersCount
    });
  }
);




export const getAllOrdersForAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {


const allOrders = await orderModel.find()

if(!allOrders){
  return next(new ErrorHandler("the order withthe id is not found", 404))
}
let totalAmount  = 0
allOrders.forEach((order)=>{
  totalAmount  +=order.totalPrice
})
     
    res.status(200).json({
      success: true,
      allOrders,
      totalAmount
    
    });
  }
);




export const updateOrderStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {


const order = await orderModel.findById(req.params.orderId)

if(!order){
  return next(new ErrorHandler("the order withthe id is not found", 404))
}

if(order.orderStatus === "Delivered"){
  return next(new ErrorHandler("You have already delivered the items", 401))
}

order.orderItems.forEach(async (singleOrder)=>{
  await updateStock(singleOrder.product, singleOrder.quantity)
})
order.orderStatus = req.body.status

if(req.body.status === "Delivered"){
  order.deliveredAt = new Date(Date.now())
}

await order.save()
 
    res.status(200).json({
      success: true,
      order,
      
    
    });
  }
);




    
export const deleteOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {


const order = await orderModel.findById(req.params.orderId)

if(!order){
  return next(new ErrorHandler("the order withthe id is not found", 404))
}
await orderModel.findByIdAndDelete(req.params.orderId)

    res.status(200).json({
      success: true,
     message: `the order with ${req.params.orderId} has been delted successfully`
    });
  }
);









async function updateStock(id:mongoose.Types.ObjectId, quantity:number) {

  const product = await productModel.findById(id)
  if(!product){
    return new ErrorHandler("the product withthe id is not found", 404)
  }
  product.stock-=quantity
  await product.save()
  
}