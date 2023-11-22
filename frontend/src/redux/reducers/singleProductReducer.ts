import { ProductTypeFrontend } from './productReducer22';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from '../store';


interface neWREviewType{
    // userId:string,
    comment:string,
    // name:string,
    rating:number,
    productId:string
  }
  
export const AddPostReview = createAsyncThunk( "products/addPostReview", async (neWREview:neWREviewType, thunkApi) => {
      try {
      
  console.log({neWREview})
  


        const { data } = await axios.put(
          `/api/v1/createReview`,neWREview,{
          headers:{
            'Content-type': 'application/json',
        },
         withCredentials:true
      }
     
          
        );
   console.log("data.product==",data.product);
   
        return data
      } catch (error:any) {
        // return error as Error
        console.log(error)
    
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
  );


  // interface IdTypeForGettingSingleProduct {
  //   id:string
  // }

  export const getSingleProductDetails = createAsyncThunk( "product/getSingleProductDetails", async (id:string, thunkApi) => {
    try {
    
// console.log("id In getSIngleProducts--",id);

      const { data } = await axios.get(
        `/api/v1/product/${id}` );
//  console.log("data.product==",data);
      return data

    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

interface editproductParamsType{
  id: string
  myForm: FormData 
}


export const editSingleProductDetails = createAsyncThunk( "product/editSingleProductDetails", async ({id,myForm}:editproductParamsType, thunkApi) => {
  try {
  
console.log("id In editSingleProductDetails--",id);

for (var pair of myForm.entries()) {
  console.log(pair[0]+ ', ' + pair[1]); 
}

    const { data } = await axios.put(
      `/api/v1/product/${id}`, myForm,{
        headers:{
          'Content-type': "multipart/form-data",
          // 'Content-type': 'application/json',

      },
       withCredentials:true
    }
      
    // const config = { headers: { "Content-Type": "multipart/form-data" } }
      
      );
      console.log(data);
    return data

  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);












export const deleteSingleProduct = createAsyncThunk( "product/deleteSingleProduct", async (id:string, thunkApi) => {
  try {
  
// console.log("id In getSIngleProducts--",id);

    const { data } = await axios.delete(
      `/api/v1/product/${id}` );
//  console.log("data.product==",data);
    return data

  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);








// interface newProductDataType{
  
//     name: string;
//     price: number;
//     description: string;
//     category: string;
//     // images: {
//     //     public_id: string;
//     //     url: string;
//     // }[];
//     images:string;
//     stock: number;
//     user: string;
// }




export const createSingleNewProduct = createAsyncThunk( "product/createSingleNewProduct", async (newProductData:FormData , thunkApi) => {
  try {
  
// console.log("id In getSIngleProducts--",id);

for (var pair of newProductData.entries()) {
  console.log(pair[0]+ ', ' + pair[1]); 
}
console.log({newProductData});
    const { data } = await axios.post(
      `/api/v1/createproduct`,newProductData,{
        headers:{
          'Content-type': "multipart/form-data",
          // 'Content-type': 'application/json',

      },
       withCredentials:true
    }
      
    // const config = { headers: { "Content-Type": "multipart/form-data" } }
      
      );
   console.log(data);

//  console.log("data.product==",data);
    return data

  }  catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }

}
);


  interface intitStateForSingleProduct {
    product: ProductTypeFrontend | null;
    loading: boolean;
    error: string | null;
    message:string | null
  }

  const initialState: intitStateForSingleProduct = {
    product:  null,
    loading: false,
    error: null,
    message:null
  };
  
  export const getSingleProductsSilce = createSlice({
    name: "product",
    initialState,
    reducers: {
      resetSingleProductReducer:(_state)=>{
        // console.log("state in singleprode", state);
        return {...initialState}
    } ,
    resetMessageForSingleProductReducer:(state)=>{
      // console.log("state in singleprode", state);
      return {
        ...state, message:null
      }
  } ,
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(AddPostReview.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.product = null
          state.message = null
        
        })
        .addCase(AddPostReview.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload.product ;
          state.error = null;
          state.message = action.payload.message
        })
        .addCase(AddPostReview.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
             state.product = null
             state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })
        .addCase(getSingleProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.product =null
            state.message = null

          })
          .addCase(getSingleProductDetails.fulfilled, (state, action:any) => {
            state.loading = false;
            // console.log("action.paylad---", action.pyload);
            state.product = action.payload.singleProduct ;
            state.error = null;
            state.message = null
          })
          .addCase(getSingleProductDetails.rejected, (state, action:any) => {
            state.loading = false;
            state.error = action.payload as string ||  action.error.message || 'Something went wrong';
            state.product =null
            state.message =  action.payload.error.split(/\r?\n/)[0]  
          })
          .addCase(createSingleNewProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.product = null
            state.message = null
          })
          .addCase(createSingleNewProduct.fulfilled, (state, action:any) => {
            state.loading = false;
            // console.log("action.paylad---", action.pyload);
            state.product = action.payload.product ;
            state.error = null;
            state.message =  action.payload.message
          })
          .addCase(createSingleNewProduct.rejected, (state, action:any) => {
            state.loading = false;
            state.error =     action.payload as string ||  action.error.message || 'Something went wrong';
            state.product = null
            state.message =   action.payload.error.split(/\r?\n/)[0]   || "new product not created";
          })
          .addCase(deleteSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.product = null
          })
          .addCase(deleteSingleProduct.fulfilled, (state, action:any) => {
            state.loading = false;
            // console.log("action.paylad---", action.pyload);
            state.product = action.payload ;
            state.message = action.payload.message

          })
          .addCase(deleteSingleProduct.rejected, (state, action:any) => {
            state.loading = false;
            state.error =     action.payload as string ||  action.error.message || 'Something went wrong';
            state.product = null
            state.message =  action.payload.error.split(/\r?\n/)[0]  || "product not deleted"

          })
          .addCase(editSingleProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.product = null
            state.message = null
          })
          .addCase(editSingleProductDetails.fulfilled, (state, action:any) => {
            state.loading = false;
            // console.log("action.paylad---", action.pyload);
            state.product = action.payload.productToBeUpdated;
            state.message = action.payload.message

          })
          .addCase(editSingleProductDetails.rejected, (state, action:any) => {
            state.loading = false;
            state.error =     action.payload as string ||  action.error.message || 'Something went wrong';
            state.product = null
            state.message =   action.payload.error.split(/\r?\n/)[0]  ||   'producct not edited went wrong';
          })
  
  
  
          
        
  
    },
  });
  


  export const {resetSingleProductReducer, resetMessageForSingleProductReducer} = getSingleProductsSilce.actions

export default getSingleProductsSilce.reducer;
