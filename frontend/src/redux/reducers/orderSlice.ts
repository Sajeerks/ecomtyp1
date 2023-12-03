

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { server1 } from '../../App';
// import { RootState } from '../store';
axios.defaults.withCredentials = true;



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
    
      const { data } = await axios.post(   `${server1}/api/v1/order/createNewOrder`,orderDetails,{
        headers:{
        //   'Content-type': "multipart/form-data",
          'Content-type': 'application/json',
  
      },
       withCredentials:true
    })
  //  console.log( "data==",data)
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
  );
  





  export const getAllOrdersFrontend = createAsyncThunk(  "orders/getAllOrdersFrontend",  async ( _, thunkApi) => {
    try {
    
      const { data } = await axios.get(   `${server1}/api/v1/order/allordres`,{
        headers:{
        //   'Content-type': "multipart/form-data",
          'Content-type': 'application/json',
  
      },
       withCredentials:true
    })
  //  console.log( "data==",data)
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
  );
  


  export const getSingleOrderForntend = createAsyncThunk(  "orders/getSingleOrderForntend",  async ( {orderId}:{orderId:string}, thunkApi) => {
    try {
    
      const { data } = await axios.get(   `${server1}/api/v1/order/${orderId}`,{
        headers:{
        //   'Content-type': "multipart/form-data",
          'Content-type': 'application/json',
  
      },
       withCredentials:true
    })
  //  console.log( "data==",data)
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
  );
  
interface updateOrderType{
  orderId:string,
  status:string
}

  export const updateOrderStatusFrontEnd = createAsyncThunk(  "orders/updateOrderStatusFrontEnd",  async ( {orderId,status}:updateOrderType, thunkApi) => {
    try {
    console.log(orderId);
    console.log(status);


      const { data } = await axios.put(   `${server1}/api/v1/order/${orderId}`,{status},{
        headers:{
        //   'Content-type': "multipart/form-data",
          'Content-type': 'application/json',
  
      },
       withCredentials:true
    })
  //  console.log( "data==",data)
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
  );



  // updateOrderStatus

  // allOrders,
  //     totalAmount



interface OrderItemsType {
  _id?:string
    price: number,
    name:string,
    quantity: number,
    image: string
    product: string,
}


export  interface OrderType{
  _id?:string
  orderItems:OrderItemsType[]  ,
    paymentInfo:{
        id:string,
        status:string
    },
    itemPrice:number,
    taxPrice:number,
    totalPrice:number,
    shippingPrice:number,
    orderStatus?:string
    shippingInfo:{
        address:string,
        city:string,
        country:string,
        state:string,
        phoneNo:number,
        pinCode:number
    },
   

}


interface intitStateForOrders {
    orders:OrderType[];
    singleOrder:OrderType |  null
    loading: boolean;
    error: string | null;
    message: string | null
    totalAmount:number
  
  }
  const initialState: intitStateForOrders = {
    orders: [],
    singleOrder:null ,
    loading: false,
    error: null,
    message:null,
    totalAmount:0,
   
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
          state.message =null
        })
        .addCase(createNewOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.singleOrder = action.payload.newOrder ;
          state.message ="new order created successfully"
         
        })
        .addCase(createNewOrder.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })

        .addCase(getAllOrdersFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message =null
        })
        .addCase(getAllOrdersFrontend.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.allOrders 
          state.totalAmount = action.payload.totalAmount
         
        })
        .addCase(getSingleOrderForntend.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })
        
        .addCase(getSingleOrderForntend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message =null
        })
        .addCase(getSingleOrderForntend.fulfilled, (state, action) => {
          state.loading = false;
          state.singleOrder = action.payload.singleOrder 
          state.totalAmount = action.payload.totalAmount
         
        })
        .addCase(getAllOrdersFrontend.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })
        
           
        .addCase(updateOrderStatusFrontEnd.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message =null
        })
        .addCase(updateOrderStatusFrontEnd.fulfilled, (state, action) => {
          state.loading = false;
          state.singleOrder = action.payload.order 
          state.message ="order updates successfully"
          
         
        })
        .addCase(updateOrderStatusFrontEnd.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })
        
        
  



        
  

        
        
        
  
    }
  

})
  
  
  

  
  

export const {resetOrdersReducer} = orderSlice.actions

export default orderSlice.reducer



