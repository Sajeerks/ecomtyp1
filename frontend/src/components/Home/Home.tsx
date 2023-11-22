import { Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./Home.scss"
import ProductCard from '../ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import {RootState,AppDispatch} from "../../redux/store"
// import { fetchIssues } from '../../redux/reducers/productReducer'
import { ProductTypeFrontend,  fetchProducts22, getAllProducts } from '../../redux/reducers/productReducer22'
import { Helmet } from 'react-helmet-async'
import Loading from '../Loading/Loading'

// const sampelProducts = [

//     {
//         "_id":"sadfgsdgfsagfa",
//         "name":"sampleproduc33333333",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         },
//         "ratings":2.5,
//         "numberOfReviews":5,
         
        
//     },

//     {
//         "_id":"adfsaffdsdf",
//         "name":"345444444444",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         }, 
//         "ratings":3,
//         "numberOfReviews":5,
        
        
//     },

//     {
//         "_id":"awsfagsdfagafg",
//         "name":"sampleproduc3335632563",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         }, 
//         "ratings":5,
//         "numberOfReviews":5,

//     },
//     {
//         "_id":"sdfsaf",
//         "name":"sampleproduc33333333",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         },
//         "ratings":2.5,
//         "numberOfReviews":5,
         
        
//     },

//     {
//         "_id":"sdf",
//         "name":"3454444kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk44444",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         }, 
//         "ratings":3,
//         "numberOfReviews":5,
        
        
//     },

//     {
//         "_id":"sadfsd",
//         "name":"sampleproduc3335632563",
//         "price":12020,
//         "description":"sample desciption",
//         "category":"sample category",
//         "images":{
//             "public_id":"sample imag",
//             "url":"https://images.unsplash.com/photo-1558383331-f520f2888351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
//         }, 
//         "ratings":5,
//         "numberOfReviews":5,

//     },
   
// ]



const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    // const githubIssueList = useSelector((state: RootState) => state.githubIssue.issues)
    // const loading = useSelector((state: RootState) => state.githubIssue.loading);
    // const error = useSelector((state: RootState) => state.githubIssue.error);
    
  const products = useSelector(getAllProducts)
    // const products = useSelector((state: RootState) => state.productsreducer.products)
    const productloading = useSelector((state: RootState) => state.productsreducer.loading);
    // const productError = useSelector((state: RootState) => state.productsreducer.error);
    const [_productsFroMBackend, setproductsFroMBackend] = useState<ProductTypeFrontend[]>([])
   
const bannerRef = useRef<HTMLDivElement>(null)

const themer = useTheme()

const BGHexCOlor = themer.palette.primary.main

// console.log(themer.palette.primary.main)
function hexToRgb(hex:string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  const rgbparded = hexToRgb(BGHexCOlor)
//   console.log(rgbparded)

// console.log({products})
 useEffect(() => {
    // dispatch(fetchIssues())
    // dispatch(fetchProducts22({keyword:'god'}))
    dispatch(fetchProducts22({keyword:'', page:0, category:null,price:[0,99999],ratings:0}))

    setproductsFroMBackend(products)
  if(bannerRef.current){
    bannerRef.current?.style.setProperty("--bgColorRed", String(rgbparded?.r))
    bannerRef.current?.style.setProperty("--bgColorBlue",String(rgbparded?.b ))
    bannerRef.current?.style.setProperty("--bgColorGreen",String(rgbparded?.g ))
    
  }
    
 }, [])
 


  return (
    <React.Fragment>

        {productloading ?<Loading/> : 

 <React.Fragment>
       <Helmet>
        <title>Home Product</title>
       
      </Helmet>
      <div className="banner"  ref={bannerRef} >
        <Typography variant='h4' sx={{color:"primary.contrastText", fontWeight:"bold"}}>Ecommerse site </Typography>
            <h2>Find your products</h2>



      <Typography variant='h5'>Products</Typography>
            <div className='prducts_frontpage'>

             

                {/* { productsFroMBackend.length >0 && productsFroMBackend.map((product, index)=>(
                    <ProductCard  key={product._id} product= {product}/>
                ))} */}

{ products.length >0 ? products.map((product)=>(
                    <ProductCard  key={product._id} product= {product}/>
                )):<Typography margin={"auto"} textAlign={"center"}>no products found</Typography>}

            </div>
      </div>



 </React.Fragment>
}

 </React.Fragment>
  )
}

export default Home