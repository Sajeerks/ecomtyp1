import { Box, Button, Card, CardActions, CardContent, Container, Grid, Rating, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {  ProductTypeFrontend } from '../../redux/reducers/productReducer22'
import { AppDispatch, RootState } from '../../redux/store'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./ProductDetails.scss"
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { toast } from 'react-toastify'
import { AddPostReview, getSingleProductDetails, resetMessageForSingleProductReducer } from '../../redux/reducers/singleProductReducer'
import Loading from '../Loading/Loading'
import { addtToCart } from '../../redux/reducers/cartReducer'
// import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontSize:"2.2vmax"
}));


//   function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       {/* <Button onClick={handleOpen}>Open modal</Button> */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

const ProductDetails = () => {
     const {productId} =  useParams()
      // let singleProductDetails:ProductTypeFrontend[] =useSelector((state:RootState)=>getsinglProductDeatailsMemoRised(state, productId))
       const {user} =  useSelector((state:RootState)=>state.user)
      // console.log({singleProductDetails})

       const {product:singleProductDetails, loading:producLoading, message:productMessage}= useSelector((state:RootState)=>state.product)
  const themer = useTheme()
    const matchesForphone = useMediaQuery(themer.breakpoints.up('sm'))


    const [addReview, setaddReview] = useState(false)
// console.log({matchesForphone})

// const handleOpen = () => setaddReview(true);
const handleClose = () => setaddReview(false);
const [comment, setcomment] = useState("")
const [newRating, setnewRating] = React.useState<number >(0)
const [cartQty, setcartQty] = useState(1)


const dispatch = useDispatch<AppDispatch>()

const alreadyReviews = Boolean(singleProductDetails?.reviews.find((review)=>review.user === user?._id))
// console.log({alreadyReviews});
const addReveiwFormSubmitHandler=(e:React.FormEvent)=>{
  e.preventDefault()
  // const userId = "65202fb19d143377ca513ab6"
  // const name ="sajjer minna"
  const productId = singleProductDetails?._id
    console.log({comment,newRating,name ,productId})
    if(productId){
      dispatch(AddPostReview({comment,rating:newRating,productId}))
      setaddReview(false)
    }
    
}


const addReviewCOntroller=(reviewUSer:string)=>{


  if(user?._id === reviewUSer ){
      setaddReview(true)
  }else{
    toast.error("you have no authority to edit this review")
  }

}
const ReviewModal = (

  <Modal
  open={addReview}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style} component={"form"} onSubmit={addReveiwFormSubmitHandler} 
  justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"column"}
  
  >
    <Typography id="modal-modal-title" variant="h6" component="h2">
    ADD a review
    </Typography>
      <TextareaAutosize
      value={comment}
    onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setcomment(e.target.value)}
      minRows={3}
       name="comment"
      />

      <Rating   value={newRating}  onChange={(_event, newRating) => {
          setnewRating(newRating as number);
        }}/>
      <Button variant='contained'  type='submit'>Edit Review</Button>
  </Box>
</Modal>
)


const addToCarthandler =(singleProductDetail:ProductTypeFrontend)=>{
  dispatch(addtToCart({singleProductDetail, cartQty}))
}

useEffect(() => {
  if(productId){
    dispatch(getSingleProductDetails(productId))
   

  }

  return () => {
 
  }
}, [])
useEffect(() => {
  if(productMessage){
    toast.success(productMessage)
    dispatch(resetMessageForSingleProductReducer())
  }

  return () => {
   
  }
}, [productMessage])


  return (
     <React.Fragment>

      {producLoading ? (<Loading/>) : 
  
   ( singleProductDetails ?(
  <Container>
    {ReviewModal}
    <Box justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
    <Typography padding={"2vh"}  variant='h5'> Product ID:{productId}</Typography>

    <Typography  padding={"2vh"}  variant='h5'>Product name -{singleProductDetails.name}</Typography>
     <Box justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={ matchesForphone?  "row" :"column"}>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"column"}
            width={ matchesForphone ?"50vw":"90vw"}
        >
            {/* image
          <img src={singleProductDetails.images[0].url} alt ={"sdfds"}/> */}
     

     <Carousel autoPlay={true} infiniteLoop={true} >

    { singleProductDetails.images && singleProductDetails.images.map( singleImge=>(
        <div key={singleImge.public_id}>
            <img src={singleImge.url} alt={singleImge.public_id}/>
        </div>
    ))}

     </Carousel>

        </Box>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"column"}
          width={ matchesForphone ?"50vw":"90vw"}
        
        > 
     <Grid container spacing={2} padding={4} alignContent={"center"} justifyContent={"center"}>
  <Grid item xs={12}>
    <Item>price :  {singleProductDetails.price}</Item>
  </Grid>
  <Grid item xs={12} md={10}>
    <Item>Ratings <Rating readOnly={true} value={singleProductDetails.ratings} /></Item>
  </Grid>
  <Grid item xs={6}>
    <Item>No of Review {singleProductDetails.numberOfReviews}</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>Category -{singleProductDetails.category} </Item>
  </Grid>
  <Grid item xs={12}>
    {/* <Item  dangerouslySetInnerHTML={{__html:singleProductDetails.description}} sx={{maxHeight:"20vh", overflowY:"scroll"}}> {singleProductDetails.description}</Item> */}
     {/* <div dangerouslySetInnerHTML={{__html:singleProductDetails.description}}></div> */}
   <Item sx={{ height:"20vh", overflowY:"scroll", resize:"both"}}>
     <div dangerouslySetInnerHTML={{__html:singleProductDetails.description}}></div>
   </Item>
  </Grid>

  <Grid item xs={12}>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"row"} >
                <Button onClick={()=>setcartQty(prev=>prev<singleProductDetails.stock?prev+1:prev)} variant="contained">+</Button> <TextField style={{textAlign:"center"}} 
                
              inputProps={{
                style: { textAlign: "center" }
              }}
                
                className='AddtotcartInput' value={cartQty}      type='number' />  <Button 
                onClick={()=>setcartQty(prev=>prev >1?prev-1:prev)}
                variant="contained">-</Button>
        </Box>
  </Grid>
  <Grid item xs={12}>
    <Button onClick={()=>addToCarthandler(singleProductDetails)}  fullWidth variant="contained">ADD TO CART</Button>
    <Button fullWidth sx={{mt:'2vh'}} variant="contained" disabled={alreadyReviews} onClick={()=>setaddReview(true)}>Create Review</Button>

  </Grid>

</Grid>
        
        
        
        </Box>
        
        </Box>   

    </Box>
    <Typography  key={"ssss"}  variant='h4' textAlign={"center"}>Reviews</Typography>
       
    <Box  key={"sdfsaffdeee"} justifyContent={"left"} display={"flex"} alignItems={"center"} flexDirection={"row"} sx={{ overflowX:"scroll"}}
    maxWidth={"100vw"}
    >
        {singleProductDetails.reviews.map((review, index)=>{
          return (  <Card key={index}  sx={{margin:"2vmax",overflowY:"scroll" , maxHeight:"20vh" ,minWidth:matchesForphone?"20vw":"50vw", textOverflow:"ellipsis", wordBreak:"break-all"}} >
                     <CardContent>
                   
                     <Typography textTransform={"uppercase"}> {review.name}</Typography>
                        <Rating  readOnly value={review.rating}/>
                         <Typography> {review.comment}</Typography>
                     </CardContent>
                     <CardActions  sx={{flexDirection:matchesForphone?"row":"column"}} >
        <Button sx={{m:1}}  variant="contained" size="small">Share</Button>
        <Button disabled={review.user !== user?._id} sx={{m:1}} onClick={()=>addReviewCOntroller(review.user)}  variant="contained" size="small" >Edit Review</Button>
      </CardActions>
             </Card>)
        })}
    </Box>
  </Container>):(
    <Box  maxWidth={"100vw"}  overflow={"scroll"}>
    <Typography whiteSpace={"pre-line"} textOverflow={"ellipsis"} textAlign={"center"} variant='h1' color={"error.main"}>No product found with id {productId} was found</Typography>

    </Box>
  )) 
}
  </React.Fragment>
  )
}

export default ProductDetails