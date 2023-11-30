
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';




interface LoginDetailsType{
    email:string,
    password:string
}
// {email:loginDetails.email,password:loginDetails.password}
export const loginUser = createAsyncThunk(  "user/loginUser",  async (loginDetails:LoginDetailsType, thunkApi) => {
      try {
       
    // console.log({loginDetails})
        const { data } = await axios.post(   `/api/v1/login`,loginDetails,{
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

  export const logOutUser = createAsyncThunk(  "user/logOutUser",  async (_, thunkApi) => {
    try {
     
  // console.log({loginDetails})
      const { data } = await axios.get(   `/api/v1/logout`,{
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


export const getAutheticatedUserME = createAsyncThunk(  "user/getAutheticatedUserME",  async (_, thunkApi) => {
  try {
   
// console.log({loginDetails})
    const { data } = await axios.get(   `/api/v1/me`,{
        headers:{
          'Content-type': 'application/json',
      },
       withCredentials:true
    });
//  console.log( "data get authenticat", data)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);


export const delteTheUserByAdmin = createAsyncThunk(  "user/delteTheUserByAdmin",  async ({id}:{id:string}, thunkApi) => {
  try {
   
// console.log({loginDetails})
    const { data } = await axios.delete(   `/api/v1/admin/user/${id}`,{
        headers:{
          'Content-type': 'application/json',
      },
       withCredentials:true
    });
 console.log( "data get delteTheUserByAdmin", data)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);



export const changeUserRoleAdmin = createAsyncThunk(  "user/changeUserRoleAdmin",  async ({id}:{id:string}, thunkApi) => {
  try {
   
// console.log({loginDetails})
    const { data } = await axios.put(   `/api/v1/admin/roleChange/${id}`,{
        headers:{                           
          'Content-type': 'application/json',
      },
       withCredentials:true
    });
//  console.log( "data get authenticat", data)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);




export const forGotPasswordActionFrontend = createAsyncThunk(  "user/forGotPasswordActionFrontend",  async (email:{email:string}, thunkApi) => {
  try {
   
// console.log({loginDetails})
    const { data } = await axios.put(   `/api/v1/forgotPassword`,email,{
        headers:{                           
          'Content-type': 'application/json',
      },
       withCredentials:true
    });
//  console.log( "data get authenticat", data)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);

interface ResetPasswordType{
  password:string,
  confirmPassword:string
  resetPasswordTokenFromUrl:string
}

export const resetPasswordActionFrontend = createAsyncThunk(  "user/resetPasswordActionFrontend",  async ({resetPasswordTokenFromUrl,password,confirmPassword}:ResetPasswordType, thunkApi) => {
  try {
   
// console.log({loginDetails})
    const { data } = await axios.put(   `/api/v1/password/reset/${resetPasswordTokenFromUrl}`,{password,confirmPassword},{
        headers:{                           
          'Content-type': 'application/json',
      },
       withCredentials:true
    });
//  console.log( "data get authenticat", data)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);









export const signUpNewUser = createAsyncThunk(  "user/signUpNewUser",  async ( formData:FormData, thunkApi) => {
  try {
   
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const { data } = await axios.post(   `/api/v1/register`,formData,{
      headers:{
        'Content-type': "multipart/form-data",
        // 'Content-type': 'application/json',

    },
     withCredentials:true
  })
//  console.log( "data.user==",data.user)
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);




export const updateTheUserDetails = createAsyncThunk(  "user/updateTheUserDetails",  async ( formData:FormData, thunkApi) => {
  try {
   
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const { data } = await axios.put(   `/api/v1/updateUserprofile`,formData,{
      headers:{
        'Content-type': "multipart/form-data",
        // 'Content-type': 'application/json',

    },
     withCredentials:true
  })
//  console.log( "data.user==",data.user)
    return data;
  }catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);




export const changePasswordOfTheUser = createAsyncThunk(  "user/changePasswordOfTheUser",  async ( formData:FormData, thunkApi) => {
  try {
   
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const { data } = await axios.put(   `/api/v1/changepassword`,formData,{
      headers:{
        // 'Content-type': "multipart/form-data",
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



  export interface userTypeInFrontEnd {
    _id: string;
    name: string;
    email: string;
    password: string;
    category: string;
    role:string;
    avatar: {
      public_id: string;
      url: string;
    }
    
  }
  
  interface intitStateForUser {
    user: userTypeInFrontEnd | null;
    loading: boolean;
    error: string | null;
    message:string |null
  }
  const initialState: intitStateForUser = {
    user: null,
    loading: false,
    error: null,
    message:null
  };
  

  
export const getUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
         resetSingleUserStateReducer:(_state)=>{
        return {...initialState}
         },
      resetSingleUserMessage:(state)=>{
      return {...state,message:null}
        },
      // resetSingleUserMessageAdmin:(state)=>{
      // return {...state,message:null}
      //   },
  

    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(loginUser.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = null
        })
        .addCase(loginUser.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
        .addCase(logOutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logOutUser.fulfilled, (state, _action:any) => {
          state.loading = false;
          state.user = null ;
          state.message = "logout succesful"
        })
        .addCase(logOutUser.rejected, (state, action:any) => {

          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message = action.error.message.split(/\r?\n/)[0]  || 'Something went wrong';
        }) 
        .addCase(getAutheticatedUserME.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getAutheticatedUserME.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = action.payload.message
        })
        .addCase(getAutheticatedUserME.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload.error.split(/\r?\n/)[0] || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "finding logged in  user failed"
        })  
        .addCase(signUpNewUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(signUpNewUser.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = action.payload.message
        })
        .addCase(signUpNewUser.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0] ||  "sign up user failed"
        })  
        .addCase(updateTheUserDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(updateTheUserDetails.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = action.payload.message
        })
        .addCase(updateTheUserDetails.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "edit up user failed"
        })  
        .addCase(changePasswordOfTheUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(changePasswordOfTheUser.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = action.payload.message 
        })
        .addCase(changePasswordOfTheUser.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "change password  user failed"
        })  
        .addCase(delteTheUserByAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(delteTheUserByAdmin.fulfilled, (state, action:any) => {
          state.loading = false;
          
          state.message = action.payload.message 
        })
        .addCase(delteTheUserByAdmin.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "change password  user failed"
        })  
        .addCase(changeUserRoleAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(changeUserRoleAdmin.fulfilled, (state, action:any) => {
          state.loading = false;
          // state.user = action.payload.user
          state.message = action.payload.message 
        })
        .addCase(changeUserRoleAdmin.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "change password  user failed"
        })  
        .addCase(forGotPasswordActionFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(forGotPasswordActionFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          // state.user = action.payload.user
          state.message = action.payload.message 
        })
        .addCase(forGotPasswordActionFrontend.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "change password  user failed"
        })  
        .addCase(resetPasswordActionFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(resetPasswordActionFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          // state.user = action.payload.user
          state.message = action.payload.message 
        })
        .addCase(resetPasswordActionFrontend.rejected, (state, action:any) => {
          state.loading = false;
          state.error =    action.payload as string ||   action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]  ||  "reset password  user failed"
        })  
      
      
      
        

        
      
        

        
        

        



        
        
      
      },

        



    });

  export const {resetSingleUserStateReducer, resetSingleUserMessage} = getUserSlice.actions

    
    export const getLoggedInUser =(state:RootState)=>state.user.user

    export default getUserSlice.reducer;