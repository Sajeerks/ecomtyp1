
import { useSelector } from 'react-redux'
import {Navigate,Outlet} from "react-router-dom"
import { RootState } from '../../redux/store'
import { toast } from 'react-toastify'

interface ProtectedRoutePropsType{
    // children:string | JSX.Element | JSX.Element[], 
    isAdmin:boolean
}

const ProtectedRoute = ({ isAdmin=false}:ProtectedRoutePropsType) => {
    const {user} = useSelector((state:RootState)=>state.user)

        // console.log("user in protecedROute" , user); 
    
    if(!user || !user.name){
        return <Navigate  to="/login" />
    }
    if(isAdmin){
        if(user && user.role !=="admin"){
            toast.error("you should login as admin ")
            return <Navigate  to="/login" />
        }
    }

  return (

    user.name? <Outlet/>:<Navigate  to="/login" />
   
  
   
  )
}

export default ProtectedRoute