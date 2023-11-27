import { Box, Button, Typography, styled } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export const  FlexedBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '80vh',
    position: 'relative',
   flexDirection:'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap:"2vmax"
  }));
  



const Success = () => {
  return (
    // <FlexedBox height={"80vh"} justifyContent={"center"} alignItems={"center"} display={"flex"}> 
    <FlexedBox > 

        <Helmet>
            <title>payment success</title>
        </Helmet>
 
  <Typography variant="h4"> payment success </Typography>
   <Button variant="contained"> <Link to="/">goto home</Link></Button>
 <Typography>By new products</Typography>
    </FlexedBox>
  )
}

export default Success