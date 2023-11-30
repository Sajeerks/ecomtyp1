import { Helmet } from "react-helmet-async"
import { FlexedBox } from "../Success/Success"
import { Box, Button, TextField } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import {  resetPasswordActionFrontend } from "../../redux/reducers/userSlice22"
import { toast } from "react-toastify"
import Loading from "../Loading/Loading"
import { useParams } from "react-router-dom"
const PasswordReset = () => {
    const {resetPasswordTokenFromUrl} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const {message, loading, error}=  useSelector((state:RootState)=>state.user)

    // console.log({resetPasswordTokenFromUrl});
const submitPasswordResetForm =(e:React.FormEvent )=>{
e.preventDefault()
if(resetPasswordTokenFromUrl){
    dispatch(resetPasswordActionFrontend({resetPasswordTokenFromUrl, password,confirmPassword}))

}

}
useEffect(() => {
    if(message){
      toast.success(message)
    }
  }, [message])
  
  useEffect(() => {
      if(error){
        toast.error(error)
      }
    }, [error])

  return (
    <Fragment>
    {loading ?(<Loading/>):(
 <FlexedBox>
       <Helmet>
        <title>Password reset</title>
       </Helmet>

       <Box component={"form"} onSubmit={submitPasswordResetForm} flexDirection={"column"} display={"flex"}  width={"70vw"}  >
     <TextField type="password" value={password} onChange={e=>setpassword(e.target.value)} label="new password" helperText='enter ur new password here'  fullWidth placeholder="enter ur new password here" />
     <TextField type="password" value={confirmPassword} onChange={e=>setconfirmPassword(e.target.value)} label="confirm password" helperText='enter ur new confrim password here'  fullWidth placeholder="enter ur new  confrim password here" />

        <Button variant="contained" sx={{mt:2}} type="submit">update  Password</Button>
     </Box>

 </FlexedBox>
    )}
  </Fragment>

  )
    }

export default PasswordReset