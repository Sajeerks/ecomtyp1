import { Helmet } from "react-helmet-async"
import { FlexedBox } from "../Success/Success"
import { Box, Button, TextField } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { forGotPasswordActionFrontend } from "../../redux/reducers/userSlice22"
import { toast } from "react-toastify"
import Loading from "../Loading/Loading"


const ForgotPassword = () => {
     const dispatch = useDispatch<AppDispatch>()
    const [email, setemail] = useState('')
    const {message, loading, error}=  useSelector((state:RootState)=>state.user)

const submitForGotPasswordForm =(e:React.FormEvent )=>{
e.preventDefault()
dispatch(forGotPasswordActionFrontend({email}))

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
        <title>forgot password</title>
     </Helmet>

     <Box component={"form"} onSubmit={submitForGotPasswordForm} flexDirection={"column"} display={"flex"}  width={"70vw"}  >
     <TextField type="email" value={email} onChange={e=>setemail(e.target.value)} label="backup email" helperText='enter back up email to recover passowrd'  fullWidth placeholder="enter ur back up email here" />
        <Button variant="contained" sx={{mt:2}} type="submit"> Forgot Password</Button>
     </Box>
    </FlexedBox>
    )}

   </Fragment>
  )
}

export default ForgotPassword