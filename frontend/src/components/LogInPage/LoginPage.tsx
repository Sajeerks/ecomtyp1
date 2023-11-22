import { Box, Button, Container, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { loginUser } from '../../redux/reducers/userSlice22'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { resetMessageForSingleProductReducer } from '../../redux/reducers/singleProductReducer'

const LoginPage = () => {
    const navigate  = useNavigate()

    const [formdatas, setformdatas] = useState({
        
        email:"sajeer@sajeer.com",
        password:"qqqqqqqq"
    })

const dispatch = useDispatch<AppDispatch>()
const {user, message}  = useSelector((state:RootState)=>state.user)
const [usernameinloginPage, setusernameinloginPage] = useState("")

let isValied = true
if(formdatas.email ==="" ||  formdatas.password ===""){
    isValied = true
}else{
    isValied =false
}


// console.log({isValied})
    const submitLoginFormHandler= (e:React.FormEvent)=>{
        e.preventDefault()
   
// console.log(formdatas)
dispatch(loginUser(formdatas))
 

setTimeout(() => {
    // navigate("/")
}, 2000);

        // setformdatas({
        //     email:"",
        //     password:""
        // })
        // isValied = false
    }

const changehandlerFuncionInLogin=  (e:React.ChangeEvent<HTMLInputElement>)=>{
    setformdatas({...formdatas,[e.target.name]:e.target.value})
}

useEffect(() => {
 if(user?.name){
    setusernameinloginPage(user.name)
 }
  
}, [])


useEffect(() => {
    // console.log("userin loginpae", user)
    if(user ){
    // console.log("userin loginpae", user)

        toast.success("you have logged in as "+user.name,{
            toastId: 'success1',
        })
        setusernameinloginPage("xxxx")
        setTimeout(() => {
          navigate("/")  
        }, 2000);
    }else if(usernameinloginPage){
    console.log("userin loginpa elseeee", user)

        toast.error("yuou have logged out ",{
            toastId: 'warn1',
        })
    }
    
    return () => {
      
      }
    
}, [user?.name])

useEffect(() => {
  toast.warning(message)
  dispatch(resetMessageForSingleProductReducer())
}, [message])




  return (
 <Container sx={{height:"60vh"}}>
          <Box component={"form"} onSubmit={submitLoginFormHandler}  
     
     display={"flex"}
     justifyContent={"center"}
     alignItems={"center"}
     flexDirection={"column"}
     margin={"5vmax"}
     >
     
       
         <TextField 
          onChange={changehandlerFuncionInLogin}
           type="email"
           name="email"
           placeholder="enter ur email"
           title="email"
           helperText="enter valid email"
           value ={formdatas.email}
           fullWidth
         />
          <TextField
          onChange={changehandlerFuncionInLogin}
     
           type="password"
           name="password"
           placeholder="enter ur password"
           title="password"
           helperText="enter valid password"
           value ={formdatas.password}
           fullWidth
           
              
         />
           <Button  variant="contained" type="submit" disabled={isValied}
           
           fullWidth
           >
            Login
           </Button>
 
     </Box> 
 </Container>
  )
}

export default LoginPage