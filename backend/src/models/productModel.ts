import mongoose, { InferSchemaType,ObjectId ,Types   } from "mongoose";

interface ImageTypeForProduct {
    name :String,
    rating: Number,
    comment:String,

}
interface ReviewTypeForProduct {
    public_id: string;
    url: string;
}


// export interface ProductType {
//     name: string;
//     price: number;
//     description: string;
//     category: string;
//     images : ImageTypeForProduct[]
//     rating:Number, 
//     stock:Number,
//     numberOfReviews:Number,
//     reviews:ImageTypeForProduct[],

// createdAt:Date
// }


// export type ProductType = InferSchemaType<typeof productSchema>;

export interface ProductType{
    _id: mongoose.Types.ObjectId 
name: string;
price: number;
description: string;
category: string;
images: {
    public_id: string;
    url: string;
}[];
ratings: number;
stock: number;
numberOfReviews: number;
reviews: {
    name: string;
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    _id?: mongoose.Types.ObjectId ;
}[];
user: mongoose.Types.ObjectId;
createdAt: Date;

}

const product1 = {
    name:"sampleproduc33333333",
    price:12020,
    description:"sample desciption",
    category:"sample category",
    images:{
        "public_id":"sample imag",
        "url":"sample url"
    }, 
    
}



// const productSchema = new mongoose.Schema<ProductType>({
const productSchema = new mongoose.Schema({

    name:{ type: String, required: [true, "Please enter the product name"] },
    price:{ type: Number, required: [true, "Please enter the product price"] , maxlength:[8, "price cannot be more than 8 characters"]},
    description:{ type: String, required: [true, "Please enter the product description"] },
    category:{ type: String, required: [true, "Please enter the product category"] },
    images:[{
        "public_id":{ type: String, required: true },
        "url":{ type: String, required: true },
       
    }], 
    ratings :{type:Number, default:0},
stock: { type: Number, required: [true, "Please enter the product stock"] ,
maxlength:[3, "price cannot be more than 3 characters"]
},

numberOfReviews:{type:Number, default:0},
reviews:[{
//     _id:  { type:mongoose.Schema.ObjectId,
//         ref:'ProductModel.reviews',
//         required:true
// },
_id:mongoose.Schema.ObjectId,

    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:true
    },
    name:{ type: String, required: true },
    rating:{ type: Number, required: true },
    comment:{ type: String, required: true },
  
}],
user:{
    type:mongoose.Schema.ObjectId,
    ref:'userModel',
    required:true
},
createdAt :{
    type:Date,
    default:Date.now()
}
},{_id:true})

export const  productModel = mongoose.model("ProductModel", productSchema)