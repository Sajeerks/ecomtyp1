import  { RootState } from './../store';
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server1 } from '../../App';
axios.defaults.withCredentials = true;


// import { id } from "date-fns/locale";

interface allProductsRequestTypeFrontend {
  keyword: string;
}
export const fetchProducts = createAsyncThunk<
  ProductTypeFrontend[],
  allProductsRequestTypeFrontend,
  { rejectValue: string }
>("products/fetchProducts", async (keyword, thunkApi) => {
  try {
    console.log(keyword.keyword);

    const response = await fetch(
      `/api/v1/allproducts?keyword=${keyword.keyword.toString()}`
    );
    const data = await response.json();
    // console.log(data.products);
    return data.products as ProductTypeFrontend[];
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
});



type keywodType = {
  keyword: string;
  page:number,
  ratings:number,
  price:number[]
  category:null| string
};
export const fetchProducts22 = createAsyncThunk(
  "products/fetchProducts22",
  async ({keyword = "", page = 1, price = [0, 99999], category=null, ratings = 0}: keywodType, thunkApi) => {
    try {
     

      let saveKeywordFromlocalStore =  localStorage.getItem("saveKeywordFromlocalStore")
      let keywordFromLoaclStore
      if(saveKeywordFromlocalStore){
        
 keywordFromLoaclStore=JSON.parse(saveKeywordFromlocalStore)
}
console.log({keywordFromLoaclStore});
   if(keywordFromLoaclStore){
    keyword =keywordFromLoaclStore
   }else{
    keyword = ""
   }
   console.log({keyword, page, price,category, ratings });


   let link:string =   `${server1}/api/v1/allproducts?keyword=${keyword}&page=${page}
   &ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`
   if(category){
      link  = 
      `${server1}/api/v1/allproducts?keyword=${keyword}&page=${page}
      &ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
  
   }

   
    const {data} = await axios.get(link)

    // console.log(data);
      return data
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);




export const fetAllProductsAdmin = createAsyncThunk(
  "products/fetAllProductsAdmin",
  async (_, thunkApi) => {
    try {
     


   
    const {data} = await axios.get(`${server1}api/v1/admin/AllproductsList`)

    // console.log(data);
      return data
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);





















export const getsampelPost = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    try {
    

      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );

      return data.posts
    } catch (error:any) {
      // return error as Error
      console.log(error)
  
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);




// interface neWREviewType{
//   userId:string,
//   comment:string,
//   name:string,
//   rating:number
// }

// export const AddPostReview = createAsyncThunk(
//   "products/addPostReview",
//   async (neWREview:neWREviewType, thunkApi) => {
//     try {
    
// console.log({neWREview})

//       const { data } = await axios.put(
//         `/api/v1/createReview`,{neWREview},{
//         headers:{
//           'Content-type': 'application/json',
//       },
//        withCredentials:true
//     }
   
        
//       );

//       return data.product
//     } catch (error) {
//       // return error as Error

//       return thunkApi.rejectWithValue((error as Error).message);
//     }
//   }
// );




export interface ProductTypeFrontend {
  _id?: string;
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
    user: string;
    rating: number;
    comment: string;
    _id?: string;
  }[];
  user: string;
  createdAt: string;
}

interface intitStateForProducts {
  products: ProductTypeFrontend[];
  loading: boolean;
  error: string | null;
  message: string | null;
  filteredProductsCount:number
  savedKeyword:null | string
}
const initialState: intitStateForProducts = {
  products: [],
  loading: false,
  error: null,
  message:null,
  filteredProductsCount:0,
  savedKeyword:""
};

export const getProductsslice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetAllProductsReducer:(_state)=>{
      // console.log("state in singleprode", state);
      return {...initialState}
  } ,
  saveKeyword:(state, action)=>{
    state.savedKeyword = action.payload 
    localStorage.setItem('saveKeywordFromlocalStore', JSON.stringify(state.savedKeyword))
  },
  resetKeywoed:(state, )=>{
    state.savedKeyword = ""
    localStorage.setItem('saveKeywordFromlocalStore', "")
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts22.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts22.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products ;
        state.filteredProductsCount = action.payload.filteredProductsCount
      })
      .addCase(fetchProducts22.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
      })

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action:any) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
      })
      .addCase(fetAllProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetAllProductsAdmin.fulfilled, (state, action:any) => {
        state.loading = false;
        state.products = action.payload.allProductsAdmin;
      })
      .addCase(fetAllProductsAdmin.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
      })








      












//       .addCase(AddPostReview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(AddPostReview.fulfilled, (state, action:any) => {
//         state.loading = false;
//         state.products = state.products.map(product=>{
//            if(product._id === action.payload._id){
//             product.reviews.map((review)=>{
//                if(review.user ===  action.payload.user){
//                 review.comment = action.payload.comment
//                 review.rating = action.payload.rating
// console.log(action.payload.rating)
//                }
               
//             })
//            }
//            return product
//         });
//       })
//       .addCase(AddPostReview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       })

  },
});







export const getAllProducts =(state:RootState)=>state.productsreducer.products


// const savedKeywordFromState =(state:RootState)=>state.productsreducer.savedKeyword



export const getsinglProductDeatailsMemoRised =createSelector(
  [getAllProducts,(_state,productId)=>productId], 
  (products,productId)=>products.filter(product=>String(product._id) === String(productId))
)



export const {resetAllProductsReducer, resetKeywoed, saveKeyword} = getProductsslice.actions

export default getProductsslice.reducer;


