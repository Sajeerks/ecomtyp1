import { ProductType } from "./../models/productModel";

import { NextFunction, Request, RequestHandler, Response } from "express";
import { productModel } from "../models/productModel";
import { ErrorHandler } from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { ApiFeatures } from "../utils/ApiFeatures";
import mongoose from "mongoose";
import cloudinary from 'cloudinary'
//create produt

export const createNewProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.user = req.user._id
    console.log("insise Createnew Product");

    let {images} = req.body
// console.log("images" ,images);
// console.log("typeof images---",typeof images);
images = JSON.parse(images)
// console.log("typeof images---",typeof images);
console.log(" images.lentth---", images.length);


const resulttArr=[]
if(images.length>0){
  for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
      // chunk_size : 5000000,
    folder: "products",
  width: 250,
    crop: "scale"
})
resulttArr.push(result) 
  }
}else{
  return next(new ErrorHandler("no image array found", 404));
}
// console.log(resulttArr);

//     const result = await cloudinary.v2.uploader.upload(images, {
//       // chunk_size : 5000000,
//     folder: "products",
//   width: 250,
//     crop: "scale"
// })
// console.log("resultin clidudinar " ,result);

// req.body.images = [{
//   public_id: result.public_id,
//   url: result.secure_url
// }]

req.body.images =resulttArr
// console.log("req.body.images ", req.body.images );
const product: ProductType | null = await productModel.create(req.body);

     
    res.status(201).json({
      success: true,
      product,
      message: `new product with ${product._id} has been created`,
    });
  }
);

export const getAllproducts:RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    

    let resultPerPage = 3

    const apiFeatures = new ApiFeatures(
      productModel.find() as ProductType[] | any,
      req.query 
    ).search().filter()

    // let products: ProductType[] | null = await productModel.find()

    let products = await apiFeatures.query;



    let filteredProductsCount: Number = 0;
    if (products) {
      filteredProductsCount = products.length;
    } else {
      filteredProductsCount = 0;
    }
    apiFeatures.pagination(resultPerPage)

console.log("froooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
    
    products = await apiFeatures.query.clone(); 

    res.status(200).json({
      success: true,
      products,
      message: "al products wre found",
      filteredProductsCount,
    });
  }
);

export const updateProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let productToBeUpdated: ProductType | null = await productModel.findById(
      req.params.id.toString()
    );
    // console.log(".req.params.id==" ,req.params.id.toString());
  //  console.log(productToBeUpdated);
    if (!productToBeUpdated) {
      return next(new ErrorHandler("product not found", 404));
    }
    
   let imgaesFromTheProductModel = await productToBeUpdated.images
   interface  existingImagesType{
      public_id: string;
      url: string;
   }
   let existingImages:existingImagesType[]=[]

  //  console.log("req.body.existingImages)==", req.body.existingImages)
  // console.log("req.body.newImage==",req.body.newImage);

  //  console.log("JSON.parse(req.body.existingImages)==", JSON.parse(req.body.existingImages))

     if(req.body.existingImages !=="undefined" && req.body.existingImages.length >0 ) {
       existingImages  = <existingImagesType[]>JSON.parse(req.body.existingImages)
     }
  

      
    let  newImages:string[]= []
    if(req.body.newImages  !=="undefined" && req.body.newImages.length >0 ) {

      newImages  = <string[]>JSON.parse(req.body.newImages)
    }



    for (let i = 0; i < imgaesFromTheProductModel.length; i++) {
         for (let j = 0; j < existingImages.length; j++) {
               if(imgaesFromTheProductModel[i].public_id !== existingImages[j].public_id){
                await cloudinary.v2.uploader.destroy(imgaesFromTheProductModel[i].public_id ).then((res)=>{
                  console.log("REs in destoring image==",res);
                })
               }              
         }   
    }

    
if(newImages && newImages.length>0){
  for (let i = 0; i < newImages.length; i++) {
        const result = await cloudinary.v2.uploader.upload(newImages[i], {
      // chunk_size : 5000000,
    folder: "products",
  width: 250,
    crop: "scale"
})
existingImages.push(result) 
  }
}

    // console.log("existingImages after pushing new images==",existingImages);

    req.body.images = existingImages

    productToBeUpdated = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      productToBeUpdated,
      message: `product with ID ${req.params.id}  is updated`,
    });
  }
);

export const deleteProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let productToBeDeleted: ProductType | null = await productModel.findById(
      req.params.id
    );

    

    if (!productToBeDeleted) {
      return next(new ErrorHandler("product not found", 404));
    } else {
      let images = productToBeDeleted?.images
      if(!images) {
        return next ( new ErrorHandler("product images not found",404 ))
      }
      for (let i = 0; i < images.length; i++) {
         await cloudinary.v2.uploader.destroy(images[i].public_id)
        
      }



      await productModel.findByIdAndDelete(req.params.id);
    }

    res.status(200).json({
      success: true,

      message: `product with ID ${req.params.id}  is deleted`,
    });
  }
);

export const getSingleProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let singleProduct: ProductType | null = await productModel.findById(
      req.params.id
    );
console.log( "getSingleProduct req.params.id==",  req.params.id);
    if (!singleProduct) {
      return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
      success: true,

      singleProduct,
      message: `product with id --${req.params.id} was found`
    });
  }
);





export const getAllProductsAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const allProductsAdmin: ProductType[] | null = await productModel.find();


    if (!allProductsAdmin) {
      return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
      success: true,

      allProductsAdmin,
      message: `all products fetched by Admin`
    });
  }
);








export const creteProductReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {

    const {rating, comment, productId} = req.body

  const review ={
    user:req.user._id.toString(),
    name:req.user.name,
    _id: new mongoose.mongo.ObjectId(),
    rating:Number(rating)
    , comment, productId
  }

  console.log("review",review)
const product = await productModel.findById(productId)

const isReviewd = product?.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
console.log("isReviewd==",isReviewd)

if(isReviewd){
  console.log("for reviweddd");
product?.reviews.forEach(rev=>{
  if(rev.user.toString() === req.user._id.toString()){
    rev.rating = Number(rating)
    rev.comment = comment
  
    // rev.user = req.user._id
  }
})
  


}else{
  console.log("for non reviewdd");

  product?.reviews.push(review)
  if(product && product?.reviews.length){
    product.numberOfReviews = product?.reviews.length | 1

  }
}

  let avg :number= 0
  if(product){
    product?.reviews.forEach((rev) => {
      avg += rev.rating;
    });

console.log(avg/product.numberOfReviews)
product.ratings = avg/product.numberOfReviews

    }
    // product?.reviews.length  

  

  await product?.save()

    res.status(200).json({
      success: true,
      product, 
      message:`product with id--${productId} has review added successsfully`

      
    });
  }
);



export const gerProductReviews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let singleProduct: ProductType | null = await productModel.findById(
      req.query.productId
    );

    if (!singleProduct) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,

      reviews:singleProduct.reviews,

    });
  }
);



export const deleteProductReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const singleProduct = await productModel.findById(
      req.query.productId
    );

    if (!singleProduct) {
      return next(new ErrorHandler("product not found", 404));
    }

//     interface reviewTypeNew {
//       name: string;
//       user: mongoose.Types.ObjectId;
//       rating: number;
//       comment: string;
//       _id?:mongoose.Types.ObjectId
//   }
    

// let newREviews:reviewTypeNew[] =[]
//    singleProduct?.reviews.forEach(rev => {
//        const newREv:reviewTypeNew = rev
//       //  console.log("clgag new red",newREv)
   
//      if(  newREv?._id!.toString() !== req.query.reviewId?.toString()){
//        newREviews.push(newREv)
//        console.log("hereer")
//      }
      
//     })
//     singleProduct.reviews = newREviews


// type typeofNewREv = typeof singleProduct.reviews

// interface newREvTYpe extends typeofNewREv{
// _id?:mongoose.Types.ObjectId;
// }

  const newREv  = singleProduct?.reviews.filter(rev=>rev?._id!.toString()!== req.query.reviewId?.toString())
  singleProduct.reviews = newREv


    await singleProduct.save()
   
    res.status(200).json({
      success: true,
      singleProduct,
    message:"product review deleted successfully"

    });
  }
);