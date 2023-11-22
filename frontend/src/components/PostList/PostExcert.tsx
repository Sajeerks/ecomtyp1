import { Box, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import ReactionButon from './ReactionButon';
import TimeAgo from './TimeAgo';


interface renderiniderType{
    post:{
      id:string
      title:string,
      body:string,
      date:string,
      userId:number,
      reactions:{
        thumbsUp: number;
        wow: number;
        heart: number;
        rocket: number;
        coffee: number;
      }
    }
  }
let  PostExcert:any = ({post}:renderiniderType) => {
    // console.log(' PostExcert rednering--',post.id)
  return (

    <Box
      key={post.id +"dfdf"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: "50vw",
        height: "20vh",

        margin: "1vmax",
        backgroundColor: "primary.main",

           
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],},
          overflow:"hidden"
      }}
    >
      <Typography  margin={"1vw"} variant="h5" >{post.title}</Typography>
      <Link to={`/post/${post.id}` } >
      <Typography  margin={"1vw"} variant="body1" >{post.body}</Typography>
      </Link>
      <Typography  margin={"1vw"} variant="body2"> Autored by :={(post.userId)}</Typography>

      <TimeAgo    timeStamp={post.date}/>


    <ReactionButon   post={post} />
    
    </Box>
  )
}


PostExcert = React.memo(PostExcert)
export default PostExcert