import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// const initState =[

//     {id:1, name:"sajeer"},
//     {id:2, name:"palan"},
//     {id:3, name:"poppan"},

// ]
interface UserType {
    id: number;
    name: string;
}


interface InitTypeForUserAPI22{
    users: UserType[];
    status: "idle" |"loading" | "succeded" | "failed";
    error: unknown;
}

const POST_URL = "https://jsonplaceholder.typicode.com/users"


const initState222:InitTypeForUserAPI22={
    users:[],
    status:"idle",
    error:null


}

export const fetchUsers =createAsyncThunk("posts/fetchUsers", async()=>{
    try {
        const response = await axios.get(POST_URL)
        // console.log(response.data)
        return [...response.data]
 
        
    } catch (error) {
        return (error as Error).message
    }
})









const userSlice =createSlice({
    name:"users",
    initialState:initState222,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action:any)=>{
            // console.log("action.apyloasin user",action.payload )

           let filteredUsers:UserType = action.payload.map((user:UserType)=>{
              return  {id:user.id,name:user.name}
              
              //  state.users=  action.payload as any
            // state.users =initState
        })
        state.users=[]
        state.users = state.users.concat(filteredUsers)
        // console.log(state.users)
    })
    }

})

export const AllusersForPost = (state:RootState)=>state.users.users
export const getALlpostPerTheUser =(state:RootState, userId:string)=>state.users.users.find(user=>String(user.id) === userId)

export default userSlice.reducer