import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';

const Loading = () => {
  return (
    <Box display={"flex"} width={"100vw"} height={"100vh"} justifyContent={"center"} alignContent={"center"}>
        <Helmet>
            <title>Loading</title>
        </Helmet>
        <Box>
        <CircularProgress
          size={40}
          thickness={4}
          sx={{position:'absolute', left:"50vw", top:"50vh"}}
        />
        </Box>
     
    </Box>
  )
}

export default Loading