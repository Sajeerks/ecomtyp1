import {app} from './app'
import dotenv from 'dotenv'
import { connectToDatabase } from './database/database'
import cloudinary from 'cloudinary'
dotenv.config({path:"../backend/config/config.env"})


process.on("uncaughtException", (err:Error)=>{
  
  console.log(`Error :${err.message}`)
  console.log(`shutting down server due to unhandled uncaughtException`)
  process.exit(1)

})


  connectToDatabase()

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME    , 
    api_key: process.env.CLOUDINARY_API_KEY    ,
    api_secret: process.env.CLOUDINARY_SECRET    ,
})





console.log(process.env.PORT)


const server = app.listen(process.env.PORT, ()=>{
    console.log(`app is working is port ${process.env.PORT}`)
})

// undhandled promise rejection

 process.on("unhandledRejection", (err:Error)=>{
  console.log(`error :${err.message}`)
  console.log(`shutting down server due to unhandled rejection`)
  server.close(()=>{
    process.exit(1)
  })
})