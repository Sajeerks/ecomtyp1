import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { PostStateType, addNewPost, fetchPosts} from "../../redux/reducers/postSlice";
// import { nanoid } from "@reduxjs/toolkit";
import TimeAgo from "./TimeAgo";
// import { format, compareAsc } from 'date-fns'
import ReactionButon from "./ReactionButon";
import { fetchUsers } from "../../redux/reducers/userSlice";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
import PostExcert from "./PostExcert";

const PostList = () => {
  const {posts, error:postError,  status:postStatus } = useSelector((state: RootState) => state.posts);


  const users = useSelector((state: RootState) => state.users.users);

  let ordersPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

  

  const dispatch  = useDispatch<AppDispatch>()
  const [formdatas, setformdatas] = useState({
   userId:"",
    title:"", 
    body:"",
    date: new Date(Date.now()).getDate()+ "-"+  new Date(Date.now()).getMonth()+ "+"+ new Date(Date.now()).getFullYear()
    ,reactions:{
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
}, 
  })

  const [addRequestStatus, setaddRequestStatus] = useState("idle")

  

    
const userOptions = users && users.map((user)=>(
    <MenuItem  key={user.id} value={user.id}>{user.name}</MenuItem>
))






useEffect(() => {
if(postStatus === "idle"){
  dispatch(fetchPosts())
}

}, [])


useEffect(() => {
dispatch(fetchUsers())
}, [])



 const authoredy =(id:number)=>{

    const authoredUser = users.find((user)=>user.id === id)
    if(authoredUser){
      return authoredUser!.name
    }else{
      return "xx"
    }
     
}
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

 let Renderinider:any = ({post}:renderiniderType)=>{


// console.log('rednering--',post.id)
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
      <Typography  margin={"1vw"} variant="body2"> Autored by :={authoredy(post.userId)}</Typography>

      <TimeAgo    timeStamp={post.date}/>


    <ReactionButon   post={post} />
    
    </Box>



  )
 }

// 
// const customComparator = (prevProps:renderiniderType, nextProps:renderiniderType) => {
//   //  if(JSON.stringify(nextProps.post.reactions.thumbsUp)=== JSON.stringify(prevProps.post.reactions.thumbsUp)){
//    if(nextProps.post=== prevProps.post){
//          console.log("prevProps.post",prevProps.post.reactions)
//          console.log("nextProps.post.",nextProps.post.reactions)

//       console.log("equal")
//    }else{
//       console.log("unequal")
      
//    }
   
//   return nextProps.post.reactions.thumbsUp === prevProps.post.reactions.thumbsUp;
// };
// console.log(customComparator)
// {/* <Renderinider post={post} key={post.id}/> */}
 Renderinider = React.memo(Renderinider)

  const renderPosts = ordersPosts.map((post:PostStateType) => (




  <PostExcert post={post} key={post.id}/>








  ));


  // renderPosts = React.memo(renderPosts)
  // renderPosts<JSX.Element[]> = React.memo(renderPosts)

// const checkforvalues =  !formdatas.title && !formdatas.body 

let isValid :boolean =true
// if(formdatas.content !=="" && formdatas.content!=="" ){
//     if(formdatas.userId!==""){
//         isValid =false
//     }
// }

// console.log("[formdatas.title,formdatas.content ].every(Boolean)",[formdatas.title,formdatas.content ].every(Boolean))
isValid =[formdatas.title,formdatas.body ,formdatas.userId].every(Boolean) && addRequestStatus === "idle"

// console.log({isValid})

  const submitFormHandler =(e: React.FormEvent ):void=>{
    e.preventDefault()
    // dispatch(postAdded({...formdatas, id:nanoid(),date:new Date(Date.now()).getFullYear()+ "-"+  new Date(Date.now()).getMonth()+ "-"+ new Date(Date.now()).getDate()}))
    // dispatch(postAdded({...formdatas}))
  
    // dispatch(postAdded({...formdatas, id:nanoid(),date:format(new Date(new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth(),new Date(Date.now()).getDate()), 'yyyy-MM-dd') }))

if(isValid){
  try {
    setaddRequestStatus("")
    dispatch(addNewPost({title:formdatas.title, body:formdatas.body, userId:formdatas.userId})).unwrap()
    setformdatas({
      userId:"",
      title:"",
      body:"",
      date:new Date(Date.now()).toString()
      ,reactions:{
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
  }, 
  })

  } catch (error) {
    console.error("faied to post ==", (error as Error).message)
  }finally{
    setaddRequestStatus("idle")
  }

}

 

    

// console.log(formdatas)

  }

  const changehandlerFuncion =(e:React.ChangeEvent<HTMLInputElement> )=>{
    //    console.log ( e.currentTarget.name     +e.currentTarget.value)
    //    console.log ( e.target.name     +e.target.value)
    // console.log(formdatas)
       setformdatas({...formdatas,[e.target.name]:e.target.value })
  }

  const changeSelectFunction=(event: SelectChangeEvent<string>)=>{
    // console.log(event)
    setformdatas({...formdatas,userId:event.target.value})
  }
let content:React.ReactNode
  if(postStatus === "loading" ){
     content  = <Typography key="dffdffff" variant="h1" color={"error.main"}>Loading...</Typography>
  }else if(postStatus === "succeded"){
    content = renderPosts
  }else if(postStatus === "failed"){
    content =<Typography key="dffdffffdddf" variant="h1" color={"error.main"} >{(postError as Error).message}</Typography>
  }


  return (
    <Container 
   key={"xxxxxxx"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
        <Box key="fdfsd">
          <Link   to="/post">See allusers</Link>
        </Box>


        
       <Box component={"form"} onSubmit={submitFormHandler}  
     
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      >
      
         <FormControl   sx={{ m: 1, minWidth: 120 }}>
        <InputLabel      id="demo-simple-select-helper-label">USer</InputLabel>
        <Select
        
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={formdatas.userId}
          label="User"
          name="userId"
          onChange={changeSelectFunction}
        >

            {users.length>0 && userOptions}
        
        </Select>
        <FormHelperText >With label + helper text</FormHelperText>
      </FormControl>
   
          <TextField 
           onChange={changehandlerFuncion}
            type="text"
            name="title"
            placeholder="enter ur title"
            title="title"
            helperText="enter valid title"
            value ={formdatas.title}
          />
           <TextField
           onChange={changehandlerFuncion}
      
            type="text"
            name="body"
            placeholder="enter ur content"
            title="body"
            helperText="enter valid content"
            value ={formdatas.body}
            
               
          />
            <Button  variant="contained" type="submit" disabled={!isValid}  >
             Submit
            </Button>
  
      </Box> 
    
    

      

      {content}



      
    </Container>
  );
};

export default PostList;
