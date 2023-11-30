import { Box, Button, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react"
import { FlexedBox } from "../Success/Success"
import axios from "axios"

const ContactForm = () => {
    const [contactdetails, setcontactdetails] = useState({
        name:"",
        email:'',
        message:""
    })
const [response, setresponse] = useState({
    message: "The form was submitted successfully.",
success:"false"
})

const [disbaleer, setdisbaleer] = useState(false)

const contactFormsubmit =(e:React.FormEvent)=>{
e.preventDefault()
console.log({contactdetails});
setdisbaleer(true)
const submitter = async()=>{
    const {data} = await axios.post("https://formsubmit.co/ajax/sajeersayed@gmail.com",
    contactdetails, 
    {
        headers:{
            //   'Content-type': "multipart/form-data",
              'Content-type': 'application/json',
      
          },
        //    withCredentials:true
    }
    )
    // console.log({data});
    setresponse(data)
    setdisbaleer(true)
}
submitter()

}
const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
    setcontactdetails({...contactdetails,[e.target.name]:e.target.value})
}


 const iREF = useRef<HTMLIFrameElement>(null)
 const DefaultLocation = { lat: 10, lng: 106};

 const [defaultLocation, _setDefaultLocation] = useState(DefaultLocation);
   useEffect(()=>{
        const ifameData =document.getElementById("iframeId")  as HTMLIFrameElement
        const lat= defaultLocation.lat || 1.305385 ;
        const lon=  defaultLocation.lng || 30.923029;
        if(ifameData){
          ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`


        }
        
    },[])

  return (
    <Fragment>
        {response.success==="true"?(<FlexedBox>
               {response.message}
        </FlexedBox>):(

     
        <FlexedBox>
        <Typography>Contact Form</Typography>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}  component={"form"}
        width={"70vw"}
        gap={2}
         onSubmit={contactFormsubmit}
        > 
     <TextField type="text" name="name" required  placeholder="enter your name "  label="name" fullWidth onChange={handleChange}/>
     <TextField type="email" name="email" required placeholder="enter your eamil " label="email"  fullWidth onChange={handleChange}/>
     <TextField type="text" multiline name="message" required placeholder="enter your message "  label="message" fullWidth onChange={handleChange}/>

     <Button  disabled={disbaleer} fullWidth variant="contained" type="submit">Send</Button>
         </Box>



{/* <form action="https://formsubmit.co/sajeersayed@gmail.com" method="POST">
     <input type="text" name="name" required />
     <input type="email" name="email" required />
     <textarea placeholder="Your Message"  name="message" rows={10} required></textarea>
     <button type="submit">Send</button>
</form>
 */}


        </FlexedBox>
   )}
  <Box display={"flex"} flexDirection={"column"} height={"auto"} width={"100vw"}  justifyContent={"center"} alignItems={"center"}>
    <Box  display={"flex"} flexDirection={"column"} height={"20vh"} marginLeft={3} width={"100vw"}  justifyContent={"center"} alignItems={"flex-start"}> 
     <Typography variant="h5">About Us</Typography>
     <Typography>we provide quality products for our customers</Typography>
     <Typography>Phone No : 00966-541936257</Typography>
     <Typography>Phone No : 00966-9562455827</Typography>
     <Typography>email :sajeersayed@gmail.com</Typography>

     <Typography>Address : Khoniani! camp office , Jubail , Eastern Provice , KSa</Typography>
     </Box>

     <Box sx={{mt:5}}  display={"flex"} flexDirection={"column"} height={"auto"} width={"100vw"}  justifyContent={"center"} alignItems={"center"}>
     <Typography variant="h5">Location</Typography>

    <iframe id="iframeId" height="500px" width="100%" ref={iREF}></iframe> 

     </Box>
  </Box>
           
    </Fragment>
  )
}

export default ContactForm