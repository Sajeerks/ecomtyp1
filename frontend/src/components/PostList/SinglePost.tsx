import {
  Box,
  Button,
  Container,
  Divider,
  
 
  TextField,
  Typography,

  
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { deletePost, getSinglePost, updatePost } from "../../redux/reducers/postSlice";
import ReactionButon from "./ReactionButon";
import { useTheme } from "@mui/material/styles";

const SinglePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { posts } = useSelector((state: RootState) => state.posts);
  const [editThePost, seteditThePost] = useState(false);

  const { postId } = useParams();
  const navigate  = useNavigate()

  // console.log({postId})

  let singlePost = useSelector((state: RootState) =>
    getSinglePost(state, postId!)
  );
  const [editPostData, seteditPostData] = useState({
    userId: "",
    title: "",
    body: "",
    id: "",
  });
  //    console.log(singlePost)

  let content: React.ReactNode;
  const themer = useTheme();

  const changehandlerFuncionforEditPost = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    seteditPostData({ ...editPostData, [e.target.name]: e.target.value });
  };

  const editsubmitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    editPostData.userId = String(singlePost?.userId!);
    editPostData.id = postId!;

    try {
      console.log(editPostData);
      dispatch(updatePost(editPostData)).unwrap();
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      seteditPostData({
        userId: "",
        title: "",
        body: "",
        id: "",
      });
    }
  };

  useEffect(() => {
    if (singlePost) {
      // console.log("ssssssssssssss");
      seteditPostData({
        ...editPostData,

        userId: singlePost.userId.toString(),
        title: singlePost.title,
        body: singlePost.body,
        id: postId!,
      });
    }

    return () => {};
  }, [singlePost]);




  const deleteTheseleectPost=(postId:string)=>{
      try {
        dispatch(deletePost(postId)).unwrap()
        navigate("/posts")

      } catch (error) {
        console.log((error as Error).message)
      }
  }

  let editForm: React.ReactNode = editThePost && (
    <Box
      component={"form"}
      onSubmit={editsubmitFormHandler}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
   <InputLabel id="demo-simple-select-helper-label">USer</InputLabel>
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
   <FormHelperText>With label + helper text</FormHelperText>
 </FormControl> */}

      <TextField
        onChange={changehandlerFuncionforEditPost}
        type="text"
        name="title"
        placeholder="enter ur title"
        title="title"
        helperText="enter valid title"
        value={editPostData.title}
      />
      <TextField
        onChange={changehandlerFuncionforEditPost}
        type="text"
        name="body"
        placeholder="enter ur content"
        title="body"
        helperText="enter valid content"
        value={editPostData.body}
      />
      <Button variant="contained" type="submit" disabled={false}>
        Submit
      </Button>
    </Box>
  );

  if (!singlePost) {
    content = (
      <Box>
        <Typography variant="h1" color={"error.main"}>
          No product found with tis id{" "}
        </Typography>
        <Link to="/posts"> Go back to list of posts</Link>
      </Box>
    );
  } else
    [
      (content = (
        <Box bgcolor={themer.palette.primary.main} m={"2vmax"}>
          <Typography variant="h5">title- {singlePost!.title}</Typography>
          <Typography variant="body2">content= {singlePost!.body}</Typography>

          <Typography variant="body1"> {singlePost!.body}</Typography>

          <Typography variant="body2"> {singlePost!.date}</Typography>

          <Typography variant="body2">
            Authoredby --- {singlePost!.userId}
          </Typography>

          <ReactionButon post={singlePost} />

          <Button
            sx={{
              m: "1vmax",
              border: "2px",
              background: themer.palette.common.white,
              color: themer.palette.common.black,
            }}
            variant="contained"
            onClick={() => seteditThePost(!editThePost)}
          >
            EDit Post
          </Button>

          <Button
            sx={{
              m: "1vmax",
              border: "2px",
              background: themer.palette.error.main,
              color: themer.palette.common.black,
            }}
            variant="contained"
            onClick={() => deleteTheseleectPost(postId!)}
          >
            Delted Post
          </Button>
        </Box>
      )),
    ];

  return (
    <Container>
      {content}
      <Divider orientation="horizontal" />
      {editForm}
    </Container>
  );
};

export default SinglePost;
