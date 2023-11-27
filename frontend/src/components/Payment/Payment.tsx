import { Fragment, useRef } from "react"
import "./Payment.scss"
import { Helmet } from "react-helmet-async"
// import {loadStripe} from '@stripe/stripe-js';


import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";

import { Box, Typography } from "@mui/material";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";
import { CreateNewOrderParamsType, createNewOrder } from "../../redux/reducers/orderSlice";
import { useNavigate } from "react-router-dom";





const Payment = () => {

 

    const stripe = useStripe();
    const elements = useElements();
    const {orderItems, totalPrice} =useSelector((state:RootState)=>state.cart)
    const {user} =useSelector((state:RootState)=>state.user)

    const payBtn = useRef<HTMLInputElement>(null)
   
// interface ShippingInfoType{
//   adddressLine1: string;
//   adddressLine2: string;
//   phoneNumber: number;
//   pinCode: number;
//   state: string;
//   city: string;
//   email: string;
//   country: string;
// }

const dispatch = useDispatch<AppDispatch>()
const navigate = useNavigate()




    const orderForSubmitting:CreateNewOrderParamsType = {
        shippingInfo:{
          address: "string",
        
          phoneNo: 2222222,
          pinCode: 22222222,
          state: "string",
          city: "string",
          
          country: "string",
        },
   
        itemPrice:totalPrice,
        taxPrice:totalPrice*.15, 
        shippingPrice:totalPrice*.1, 
        totalPrice:totalPrice*1.25,
        paymentInfo:{
            id:"",
            status:""
        }, 
        orderItems:[{
          price:254,
          name:"sample producname",
          quantity:10,
          image:"sample picture",
          product:"sampel produt id"
    
        }]
    
      }
      const shippingIfoFromLocalStorage = localStorage.getItem("shippingInfo")
      const orderItemsFromLocalStorage = localStorage.getItem("cartItems")

      if(shippingIfoFromLocalStorage){
       orderForSubmitting.shippingInfo.address = JSON.parse(shippingIfoFromLocalStorage).adddressLine1 + "  " +JSON.parse(shippingIfoFromLocalStorage).adddressLine2
       orderForSubmitting.shippingInfo.city = JSON.parse(shippingIfoFromLocalStorage).city
       orderForSubmitting.shippingInfo.state = JSON.parse(shippingIfoFromLocalStorage).state
       orderForSubmitting.shippingInfo.country = JSON.parse(shippingIfoFromLocalStorage).country
       orderForSubmitting.shippingInfo.pinCode = JSON.parse(shippingIfoFromLocalStorage).pinCode
       orderForSubmitting.shippingInfo.phoneNo = JSON.parse(shippingIfoFromLocalStorage).phoneNumber


      }
      if(orderItemsFromLocalStorage){
      
        orderForSubmitting.orderItems = JSON.parse(orderItemsFromLocalStorage).orderItems.map((singleOrder:any)=>{
          return{
            price: singleOrder.price,
            name: singleOrder.name,
            quantity: singleOrder.qty,
            image: singleOrder.image,
            product: singleOrder.productId,
          }
        })
        orderForSubmitting.itemPrice = JSON.parse(orderItemsFromLocalStorage).totalPrice
       }
       //arrange Order correctly for backend
       

       


    const paymentData = {
        amount:Math.round(orderForSubmitting.totalPrice*1.25*100) ,/// multiply with 100 to get in rs as stire show in paise
        email: user && user.email 
    }



    const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        payBtn.current!.disabled = true;
        console.log("clidkeeeeeee")
        try {
          const config = {
            headers: { "Content-Type": "application/json" },
          };
          const { data } = await axios.post(
            // "/api/v1/payment/process",
            "/api/v1/payment/process",
            paymentData,
            config
          );
          const client_secret = data.client_secret;
          console.log("client_secret :",client_secret)
          if (!stripe || !elements) return;
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement)!,
              billing_details: {
                name: user && user.name || "blank name",
                email:user &&  user.email || "blank email"
                
                ,
                address: {
                  line1: orderForSubmitting.shippingInfo.address ,
                  city: orderForSubmitting.shippingInfo.city,
                  state: orderForSubmitting.shippingInfo.state,
                  postal_code: orderForSubmitting.shippingInfo.pinCode.toString(),
                  country: orderForSubmitting.shippingInfo.country,
                },
              },
            },
          });
      
          if (result.error) {
           /// console.log("resutlt error:", result)
            payBtn.current!.disabled = false;
            window.alert(result.error.message || " there is an error in stripe payment") ;
          }else{
             // console.log("resutl ELSE t:", result)
              if(result.paymentIntent.status ==="succeeded"){
                orderForSubmitting.paymentInfo= {
                  id:result.paymentIntent.id,
                  status:result.paymentIntent.status,
                }
                localStorage.setItem("orderAfterPayment", JSON.stringify(orderForSubmitting))
                
                dispatch(createNewOrder(orderForSubmitting))
                navigate("/payment/success")
              }else{
                console.log("resutl lastttttt t:", result)
                 window.alert("There is an issue while processing payment")
              }
          }
        } catch (error:any) {
          payBtn.current!.disabled = false;
          window.alert(error.response.data.message as string);
        }
      };





  return (
    <Fragment>
          <Helmet>
        <title>Payment Page</title>
       
      </Helmet>

      <Box className="main_payment">
      <Typography variant="h4">Payment page</Typography>

      <Box className="paymentContainer">

<Typography variant="h5">Card Info</Typography>
 <Box component={"form"} className="paymentForm" onSubmit={(e) => submitHandler(e)}>

    <div>
      <CreditCardIcon />
      <CardNumberElement className="paymentInput" />
    </div>
    <div>
      <EventAvailableIcon />
      <CardExpiryElement className="paymentInput" />
    </div>
    <div>
      <VpnKeyIcon />
      <CardCvcElement className="paymentInput" />
    </div>

    <input
      type="submit"
      value={`Pay - ₹${orderItems && totalPrice}`}
      ref={payBtn}
      className="paymentFormBtn"
    />
  </Box> 
</Box>

<div>4242 4242 4242 4242</div>


      </Box>

   
          

    </Fragment>
  )
}

export default Payment