

import { PayloadAction, createAsyncThunk, createSlice, nanoid, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import { sub } from 'date-fns';

export interface PostStateType{
    id: string;
    title: string;
    body: string;
    userId: number;
    date: string;
    reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
    // [index:string]:string
    };
}

export interface PostStateType22{
    id: string;
    title: string;
    body: string;
    userId: number;
    date?: string;
    reactions?: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
    // [index:string]:string
    };
}


// const intitState:PostStateType[] =[
//     {id:"1", title:"learing fiers ofr", body:"this is a first conttne" , userId:3, date:"2023-10-23"
    
// ,reactions:{
//     thumbsUp:0,
//     wow:0,
//     heart:0,
//     rocket:0,
//     coffee:0
// }

// },
//     {id:"2", title:"learing fier  second popst", body:"this is a sencodn conttne", userId:2,date:"2020-10-26"
//     ,reactions:{
//         thumbsUp: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0,
// }, },



// ]


const POST_URL = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts =createAsyncThunk("posts/fetchPosts", async()=>{
    try {
        const response = await axios.get(POST_URL)
        // console.log(response.data)
        return [...response.data]
 
        
    } catch (error) {
        return (error as Error).message
    }
})


interface IntialPostType{
    title:string,
    body:string
    userId:string
}

export const addNewPost =createAsyncThunk("posts/addNewPost", async(intialPost:IntialPostType)=>{
    try {
        const response = await axios.post(POST_URL, intialPost)
        console.log(response.data)
        return response.data
 
        
    } catch (error) {
        return (error as Error).message
    }
})

interface updatePostObjectType{
    title:string,
    body:string,
    id:string,
    userId:string
}

export const updatePost =createAsyncThunk("posts/updatePost", async(updatePostObject:updatePostObjectType)=>{
    const {id} = updatePostObject
    console.log(JSON.stringify(updatePostObject))
    try {
        const response = await axios.put(`${POST_URL}/${id}`,JSON.stringify(updatePostObject), {
            headers:{
                'Content-type': 'application/json',
            },
            // withCredentials:true
        } )
        console.log(response.data)
        return response.data
 
        
    } catch (error) {
        console.log(error)
        return (error as Error).message
    }
})




export const deletePost =createAsyncThunk("posts/deletePost", async(postId:string)=>{
    
    
    try {
        const response = await axios.delete(`${POST_URL}/${postId}`
            // withCredentials:true
         )
        console.log(response.data)
        if(response?.status === 200)  return postId
        return `${response.status} : ${response.statusText}`
        return response.data
 
        
    } catch (error) {
        console.log(error)
        return (error as Error).message
    }
})







interface InitTypeForAPI{
    posts: PostStateType[];
    status: "idle" |"loading" | "succeded" | "failed";
    error: unknown;
    count:number
}

// interface InitTypeForAPI22{
//     posts: PostStateType22[];
//     status: "idle" |"loading" | "succeded" | "failed";
//     error: unknown;
// }


const initStatForApi:InitTypeForAPI ={
    posts:[],
    status: "idle",// "idle" |"loading" | "succeded" | "failed"
    error:null,
    count:0

}

// const psstformAPi =
//     {
//         "userId": 1,
//         "id": 1,
//         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//       }

//type PostFormApi = typeof psstformAPi

const postSlice = createSlice({
    name:"posts", 
    initialState:initStatForApi, 
    reducers: {
        postAdded(state, action){
            // console.log(action.payload)
            state.posts.push(action.payload)
        },

        reactionAdded(state, action:PayloadAction<ReactingAddType>){
            const {postId, reaction} = action.payload 
            const existingProduct = state.posts.find(post =>post.id ===  postId)
            if(existingProduct! ){
                existingProduct.reactions[reaction as keyof ReactionEmojiType]++
                // existingProduct.reactions[reaction]++

            } 

        },
        increaseCount(state){
            state.count = state.count+1
        }
           
          
        }, 
    extraReducers(builder){
        builder.addCase(fetchPosts.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(fetchPosts.fulfilled, (state,action:any)=>{
            state.status = "succeded"
            let min=1
            const derivedPosts = action.payload as PostStateType22[]
            // console.log("hererere")
            // console.log(derivedPosts)

            const loadedPosts  =derivedPosts.map(post=>{
                post.date = sub(new Date(),{minutes:min++}).toISOString()
                post.reactions={
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
            }
        //    console.log("post",post)
            return post
        })
        state.posts =[]
        state.posts = state.posts.concat((loadedPosts as unknown) as PostStateType)
        // console.log(state.posts)
        }).addCase(fetchPosts.rejected, (state,action)=>{
            state.status = "failed",
            state.error = action.error.message
        }).addCase(addNewPost.fulfilled, (state,action:any)=>{
            // console.log("action payload==", action.payload)
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions={
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
            }
            action.payload.id = nanoid()
            // console.log(action.payload)
            state.posts.push(action.payload)
        }).addCase(updatePost.fulfilled, (state, action:any)=>{
            console.log(action.payload)
            if(!action.payload?.id){
                console.log("update could not complete")
                console.log(action.payload)
                return
            }
            const {id} =  action.payload 
            action.payload.date = new Date().toISOString()
            action.payload.reactions={
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
            }
            const posts = state.posts.filter(post=>post.id !== id)
            state.posts = [...posts,action.payload]
        })
        .addCase(deletePost.fulfilled,(state,action:any)=>{
            // console.log("action.payload",action.payload)
            // if(!action.payload?.id){
            //     console.log("delete could not complete")
            //     console.log(action.payload)
            //     return
            // }

             const posts=  state.posts.filter(post=>{
                if(String( post.id )!== String(action.payload)){

                    return post
                }else{
                    // console.log(post)
                }
             })
            //  console.log(posts)
            // console.log(posts.length)
             state.posts =[]
            //  console.log(" state.posts ", state.posts )
             state.posts = posts
            //  console.log(state.posts)
        })





    }



})


interface ReactingAddType{
    [index:string]:string,
    postId:string
    , reaction:string
}
interface ReactionEmojiType{
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
}


export const selectAllPosts = (state:RootState)=>state.posts.posts
export const getSinglePost = (state:RootState, postId:string) => {
    // console.log("insise get single post")
  return  state.posts.posts.find(post=>String(post.id) === String(postId))
}


export const selectPostByIDUsingCreateSelector =createSelector(
    [selectAllPosts,(_state,userId)=>userId], 
    (posts,userId)=>posts.filter(post=>String(post.userId) === String(userId))
)




export const getCount =  (state:RootState)=>state.posts.count


export const {postAdded,reactionAdded, increaseCount} = postSlice.actions
export default postSlice.reducer