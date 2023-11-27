

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';



export interface CreateNewOrderParamsType{

   shippingInfo: {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: number,
    phoneNo: number
},
orderItems :
    {
        name: string,
        price: number,
        quantity: number,
        image: string,
        product: string
    }[]
,
paymentInfo: {
    id: string,
    status: string
},
itemPrice: number,
taxPrice: number,
shippingPrice: number,
totalPrice: number


}




export const createNewOrder = createAsyncThunk(  "orders/createNewOrder",  async ( orderDetails:CreateNewOrderParamsType, thunkApi) => {
    try {
    
      const { data } = await axios.post(   `/api/v1/order/createNewOrder`,orderDetails,{
        headers:{
        //   'Content-type': "multipart/form-data",
          'Content-type': 'application/json',
  
      },
       withCredentials:true
    })
   console.log( "data==",data)
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
  );
  









interface OrderItemsType {
    price: number,
    name:string,
    quantity: number,
    image: string
    product: string,
}


interface OrderType{
    orderitems:OrderItemsType[]  ,
    paymentInfo:{
        id:string,
        status:string
    },
    itemPrice:number,
    taxPrice:number,
    totalPrice:number,
    shippingPrice:number,
    shippingInfo:{
        address:string,
        city:string,
        country:string,
        state:string,
        phoneNo:number,
        pinCode:number
    }

}


interface intitStateForOrders {
    orders:OrderType[];
    singleOrder:OrderType |  null
    loading: boolean;
    error: string | null;
    message: string | null;
  
  }
  const initialState: intitStateForOrders = {
    orders: [],
    singleOrder:null ,
    loading: false,
    error: null,
    message:null,
   
  };
  
  export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      resetOrdersReducer:(_state)=>{
        // console.log("state in singleprode", state);
        return {...initialState}
    } ,
},
    extraReducers: (builder) => {
      builder
        .addCase(createNewOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createNewOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.singleOrder = action.payload.newOrder ;
         
        })
        .addCase(createNewOrder.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })
  
    
  
    }
  

})
  
  
  

  
  

export const {resetOrdersReducer} = orderSlice.actions

export default orderSlice.reducer



