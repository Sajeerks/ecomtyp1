
import { ProductType } from "../models/productModel"
import { NextFunction, Request, Response } from "express";


 export interface QueryType{
    keyword:string
}
interface KywordType{
    name: {
        $regex: string;
        $options: string;
    };
}

export class ApiFeatures{

    queryStr:any
    query:ProductType[] | any
      constructor( query:ProductType[] , queryStr:any){
   this.query = query 
   this.queryStr = queryStr
    }

    search(){
        const keyword:KywordType|{} = this.queryStr.keyword ? ({
            name:{
                $regex:this.queryStr.keyword,
             $options :"i"
            }
        }):{
           
        }

        console.log("keywordd==",{...keyword})
        // console.log(this.query)
        // console.log("this.queryStr==",this.queryStr)
   
    this.query = this.query.find({...keyword})
     return this
    }


    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        // console.log("queyCopy before", queryCopy)
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key ]);
    
        // Filter For Price and Rating
        // console.log("queyCopy after", queryCopy)

    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));

        // console.log("queyCopy last", queryCopy)
        console.log("queryStr last", queryStr)


    
        return this;
      }

      pagination(resultPerPage:number) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }




}