import mongoose  from "mongoose";



  export const connectToDatabase = () =>  mongoose.connect(String(process.env.MONGO_DB_URI!)
  
  
//   , 

// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }
  
  ).then((data)=>{

    console.log(`Mongodb is connected with ${data.connection.host}`)
  }).catch((err)=>{
    console.log(err)
  })