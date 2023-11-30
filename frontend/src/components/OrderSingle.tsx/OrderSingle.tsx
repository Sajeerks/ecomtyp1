import { Fragment, useEffect, useState } from "react"
import {  OrderType, getSingleOrderForntend } from "../../redux/reducers/orderSlice"
import "./OrderSingle.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { toast } from "react-toastify"
import Loading from "../Loading/Loading"
import { FlexedBox } from "../Success/Success"
import { Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";


const OrderSingle = () => {
  const {orderId} = useParams()
  const dispatch = useDispatch<AppDispatch>()
   const {singleOrder, loading,error, message} =useSelector((state:RootState)=>state.order)
    const [singelOrderState, setsingelOrderState] = useState<OrderType| null>(null)

     

useEffect(() => {
  if(orderId){
    dispatch(getSingleOrderForntend({orderId}))

  }

}, [orderId])

useEffect(() => {
setsingelOrderState(singleOrder)

}, [loading])


const totalQuandity =singelOrderState && singelOrderState?.orderItems.reduce((acc,item)=>item.quantity+acc,0)
 const artificalTable = {
   "Total Price":singelOrderState && singelOrderState.itemPrice,
   "Total Quantity":totalQuandity ,
   "orderStatus": singelOrderState && singelOrderState.orderStatus,
  "Payment ID": singelOrderState && singelOrderState.paymentInfo.id,
   "Payment Status": singelOrderState && singelOrderState.paymentInfo.status,

 }

//  type TypeOFartificalTable    = typeof artificalTable  


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

      {loading?(<Loading/>):(
       <Fragment>
        <FlexedBox sx={{height:"auto", mt:"2vh"}}>

        <Typography variant="h3">Order id :{ singelOrderState && singelOrderState._id} </Typography>
     
        <Typography variant="h5">Order Details </Typography>
       
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >

            <TableCell sx={{fontWeight :"bold",fontSize:"1.5vmax", color:red[900]}} align="center">Total Price</TableCell>
            <TableCell  sx={{fontWeight:"bold",fontSize:"1.5vmax", color:red[900]}} align="center">Total Quandity</TableCell>
            
            <TableCell  sx={{fontWeight:"bold",fontSize:"1.5vmax", color:red[900]}} align="center">orderStatus</TableCell>

            <TableCell  sx={{fontWeight:"bold",fontSize:"1.5vmax", color:red[900]}} align="center">Payment ID</TableCell>
            <TableCell  sx={{fontWeight:"bold",fontSize:"1.5vmax", color:red[900]}} align="center">Paymnet Status</TableCell>
        

          </TableRow>
        </TableHead>
        <TableBody>
     
            <TableRow
              key={"row"}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
    

            
              <TableCell   align="center">  {artificalTable["Total Price"]}</TableCell>
              <TableCell align="center">  {artificalTable["Total Quantity"]}</TableCell>
              <TableCell align="center">  {artificalTable["orderStatus"]}</TableCell>
              <TableCell align="center">  {artificalTable["Payment ID"]}</TableCell> 
              <TableCell align="center">  {artificalTable["Payment Status"]}</TableCell> 

            </TableRow>
          
    
        </TableBody>
      </Table>
    </TableContainer>


<hr />

<Typography variant="h5">Order Items list </Typography>
   
         
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">Sl No</TableCell>
            <TableCell  sx={{fontWeight:"bold", color:red[900]}} align="center">Product ID</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">name</TableCell>
            <TableCell  sx={{fontWeight:"bold", color:red[900]}} align="center">Price</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">Quandity</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">image</TableCell>
        

          </TableRow>
        </TableHead>
        <TableBody>
          {singelOrderState && singelOrderState.orderItems.map((row, index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{index+1}</TableCell>

              <TableCell align="center">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center"><img src={row.image} width={"30px"}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>




    <Typography variant="h5">Shipping Address </Typography>

         
    <TableContainer component={Paper} sx={{mb:2}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">Address</TableCell>
            <TableCell  sx={{fontWeight:"bold", color:red[900]}} align="center">City</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">state</TableCell>
            <TableCell  sx={{fontWeight:"bold", color:red[900]}} align="center">Country</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">Phone No</TableCell>
            <TableCell sx={{fontWeight:"bold", color:red[900]}} align="center">PinCode</TableCell>
        

          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
              key={"dfdfd"}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              

              <TableCell align="center">
               {singelOrderState && singelOrderState?.shippingInfo.address}
              </TableCell>
              <TableCell align="center"> {singelOrderState && singelOrderState?.shippingInfo.city}</TableCell>
              <TableCell align="center">    {singelOrderState && singelOrderState?.shippingInfo.state}</TableCell>
              <TableCell align="center">    {singelOrderState && singelOrderState?.shippingInfo.country}</TableCell>
              <TableCell align="center">    {singelOrderState && singelOrderState?.shippingInfo.phoneNo}</TableCell>
              <TableCell align="center">    {singelOrderState && singelOrderState?.shippingInfo.pinCode}</TableCell>

            </TableRow>
      
        </TableBody>
      </Table>
    </TableContainer>

 


        </FlexedBox>

  </Fragment>
      )}
    </Fragment>
  )
}

export default OrderSingle