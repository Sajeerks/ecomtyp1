import { ErrorHandler } from './../utils/errorHandler';
import mongoose, { InferSchemaType, Model, Schema   } from "mongoose";
import { productModel } from "./productModel";


export type OrderType =  InferSchemaType<typeof orderSchema>

export interface OrdertypeFor{
    _id:mongoose.Types.ObjectId,
 shippingInfo:{
    address:string,
   
    city:string,
    state:string,
    country:string,
    pinCode:number,
    phoneNo:number,
    },
    orderItems:[{
    name:string,
    price:number,
    quantity:number,
    image:string,
    product:mongoose.Types.ObjectId,
    
   }],
   
    user:mongoose.Types.ObjectId,

   paymentInfo:{
    id:string,
    status:string,
   },
   paidAt:{
       type:Date,
       required:true
   },
   itemPrice:number,
   taxPrice:number,
   shippingPrice:number,
   totalPrice:number,
   
   orderStatus:string,
   deliveredAt:Date,
   createdAt:Date,
        
   
   
   
}


export interface OrderMethods {
    updateStatus(product:mongoose.Types.ObjectId, quantity:number): any
  }
  

  export type OrderModelTrue = Model<OrdertypeFor, {}, OrderMethods>;

const orderSchema = new mongoose.Schema<OrdertypeFor, OrderModelTrue,OrderMethods>({

 shippingInfo:{
 address:{type:String, required:true},

 city:{type:String, required:true},
 state:{type:String, required:true},
 country:{type:String, required:true},
 pinCode:{type:Number, required:true},
 phoneNo:{type:Number, required:true},
 },
 orderItems:[{
 name:{type:String, required:true},
 price:{type:Number, required:true},
 quantity:{type:Number, required:true},
 image:{type:String, required:true},
 product:{
    type:mongoose.Schema.ObjectId,
    ref:"productModel",
    required:true
 },
}],

 user:{
    type:mongoose.Schema.ObjectId,
    ref:'userModel',
    required:true
},
paymentInfo:{
 id:{type:String, required:true},
 status:{type:String, required:true},
},
paidAt:{
    type:Date,
    required:true
},
itemPrice:{type:Number, required:true, default:0},
taxPrice:{type:Number, required:true, default:0},
shippingPrice:{type:Number, required:true, default:0},
totalPrice:{type:Number, required:true, default:0},

orderStatus:{type:String, default:"Processing"},
deliveredAt:Date,
createdAt:{
    type:Date,
    default:Date.now()
},
     





},{_id:true})


orderSchema.methods.updateStatus = async function (product:mongoose.Types.ObjectId, quantity:number) {
    
 const productQuantityToBeUpadated =      await productModel.findById(product)
if(!productQuantityToBeUpadated){
   return new ErrorHandler("the product to be updated is not found", 404)
}
 productQuantityToBeUpadated.stock -= quantity
await   productQuantityToBeUpadated.save()

}

export const  orderModel = mongoose.model<OrdertypeFor,OrderModelTrue >("orderModel", orderSchema)
