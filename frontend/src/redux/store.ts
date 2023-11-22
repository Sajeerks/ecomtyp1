import  cartSlice  from './reducers/cartReducer';
import  {configureStore} from '@reduxjs/toolkit'

import IssueReducer from "../redux/reducers/productReducer"
import productsreducer from "../redux/reducers/productReducer22"
import counterSlice from './reducers/counterSlice'
import postSlice from './reducers/postSlice'
import userSlice from './reducers/userSlice'
import  getUserSlice  from './reducers/userSlice22'
import getSingleProductsSilce  from './reducers/singleProductReducer'
import  getAllUsersSlice  from './reducers/allUsers'

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
//   import storage from 'redux-persist/lib/storage'
//   import { PersistGate } from 'redux-persist/integration/react'
// // export const server = "https://sajeercoursebundler.herokuapp.com/api/v1"

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }
  

const store = configureStore({
    reducer:{
        githubIssue: IssueReducer,
        productsreducer:productsreducer,
        counter:counterSlice,
        posts:postSlice,
        users:userSlice,
        user:getUserSlice,
        product:getSingleProductsSilce,
        allUsers:getAllUsersSlice,
        cart:cartSlice,

    }
})

export default store


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const keyyyyyy = store.getState().productsreducer.savedKeyword
