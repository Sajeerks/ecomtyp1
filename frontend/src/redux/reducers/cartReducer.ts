
import {  createSlice } from '@reduxjs/toolkit';




interface OrderITemType{
    name:string,
    productId:string,
    qty:number,
    price:number
    image:string
}

interface initialStateCartType{
    orderItems:OrderITemType[],
    totalPrice:number,
    totalQty:number
}


const initialState:initialStateCartType = {
    orderItems:[], 
    totalPrice:0,
    totalQty:0

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCartFromLocalstore:(state)=>{
            let cartFromLocalStore = localStorage.getItem("cartItems")
            if(cartFromLocalStore){
            let    parsedCartFromLocalStore = JSON.parse(cartFromLocalStore)  as initialStateCartType
           console.log({parsedCartFromLocalStore});

                   state.orderItems = parsedCartFromLocalStore.orderItems
                   state.totalPrice = parsedCartFromLocalStore.totalPrice
                   state.totalQty = parsedCartFromLocalStore.totalQty


            }
           
            },

      
        addtToCart:(state,action)=>{
            // console.log("actionin car", action.payload);
              const singleORderITem = {
                name:action.payload.singleProductDetail.name,
                productId:action.payload.singleProductDetail._id,
                qty:action.payload.cartQty,
                price:action.payload.singleProductDetail.price,
                image:action.payload.singleProductDetail.images[0].url
            }
          
            let ifItemExist:boolean =   Boolean(state.orderItems.find(singleItem =>singleItem.productId === singleORderITem.productId))
  
          if(ifItemExist){
             state.orderItems.map(singleITem=>singleITem.productId === singleORderITem.productId?singleITem.qty =singleORderITem.qty:singleITem)
          }else{
            state.orderItems.push(singleORderITem)

          }
           
     
            state.totalPrice = state.orderItems.reduce((acc,val)=>acc+ (val.price * val.qty),0)
            state.totalQty   =state.orderItems.reduce((acc,val)=>acc+ ( val.qty),0)
        
           localStorage.setItem("cartItems", JSON.stringify(state))
        } ,
        
        
        removeFromCart:(state,action)=>{

            state.orderItems.filter(singleItem=>singleItem.productId!==action.payload.productId)
            state.totalPrice = state.orderItems.reduce((acc,val)=>acc+ (val.price * val.qty),0)
            state.totalQty   =state.orderItems.reduce((acc,val)=>acc+ ( val.qty),0)
        
           localStorage.setItem("cartItems", JSON.stringify(state))

        }


      
        

    },
 
  });

  export const {addtToCart, loadCartFromLocalstore, removeFromCart} = cartSlice.actions
  export default cartSlice.reducer;
  