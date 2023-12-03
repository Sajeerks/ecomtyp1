import { server1 } from "../../App"

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from '../store';
import { userTypeInFrontEnd } from './userSlice22';
axios.defaults.withCredentials = true;


export const getAllUsersInForntEnd = createAsyncThunk(  "allUsers/getAllUsersInForntEnd",  async (_, thunkApi) => {
    try {
     
  console.log("herrrr")
      const { data } = await axios.get(   `${server1}/api/v1/allusers`,{
          headers:{
            'Content-type': 'application/json',
        },
         withCredentials:true
      });
//  console.log( "data.user==",data.user)
      return data; 
    } catch (error:any) {
      // return error as Error
      console.log(error)

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

interface initialStateForALlUsers {
    allUsers: userTypeInFrontEnd[] | null;
    loading: boolean;
    error: string | null;
    message:string | null
  }

  const initialState: initialStateForALlUsers = {
    allUsers:  [],
    loading: false,
    error: null,
    message:null
  };
  
  export const getAllUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
      resetAllUsersReducer:(_state)=>{
        // console.log("state in singleprode", state);
        return {...initialState}
    } ,
    resetMessageForAllUsersReducer:(state)=>{
      // console.log("state in singleprode", state);
      return {
        ...state, message:null
      }
  } ,
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllUsersInForntEnd.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.allUsers = null
          state.message = null
        
        })
        .addCase(getAllUsersInForntEnd.fulfilled, (state, action) => {
          state.loading = false;
          state.allUsers = action.payload.allUsers ;
          state.error = null;
          state.message = action.payload.message
        })
        .addCase(getAllUsersInForntEnd.rejected, (state, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
             state.allUsers = null
             state.message =   action.payload.error.split(/\r?\n/)[0]   || 'Something went wrong';
        })

          
        
  
    },
  });
  







  export const {resetAllUsersReducer, resetMessageForAllUsersReducer} = getAllUsersSlice.actions


export default getAllUsersSlice.reducer;