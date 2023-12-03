import express from 'express'
import {NextFunction, Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
export const app = express()
import {ErrorMiddleWare} from "./middleware/errorMaker"
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:"../backend/config/config.env"})



app.use(fileUpload())

app.use(express.json())
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser())

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,

      credentials: true,
      // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );


import { productRouter  } from './routes/productRoute'
import { userRouter } from './routes/userRoute'
import { orderRouter } from './routes/orderRoute'
import { paymentRouter } from './routes/paymentRoutes'







app.use( '/api/v1',productRouter)
app.use( '/api/v1',userRouter)
app.use( '/api/v1',orderRouter)
app.use( '/api/v1',paymentRouter)






// app.use(express.static(path.join(__dirname, "../../frontend/dist")))
// // app.use(express.static(path.join(__dirname, "../frontend/build")), options)


// app.get("*", (req, res)=>{
//     res.sendFile(path.resolve(__dirname,"../../frontend/dist/index.html" ))
// })


app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);




app.use(ErrorMiddleWare)

// app.use((err:  Error, req: Request, res: Response, next: NextFunction) => {
//     return res.status(400).send('An error occurred');
// })