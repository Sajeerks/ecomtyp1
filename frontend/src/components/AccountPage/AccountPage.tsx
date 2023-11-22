import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { changePasswordOfTheUser, getAutheticatedUserME, resetSingleUserMessage, updateTheUserDetails } from "../../redux/reducers/userSlice22";
import Loading from "../Loading/Loading";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import "./AccountPage.scss";
import { Helmet } from 'react-helmet-async'
import * as yup from 'yup';
import { useFormik } from 'formik';

import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";


function checkforSIzeOfFiels(file:any) {
  let valid = true;
  console.log("new Blob([file]).size--",new Blob([file]).size);
  if( new Blob([file]).size >= 1024*1027/2){
      console.log("new Blob([file]).size--",new Blob([file]).size);
    valid = false
   }
   return valid;
  
}
function checkIfFilesAreCorrectType(file:any) {
  // console.log(file);
  let valid = true;

  console.log("new Blob([file]).size--",new Blob([file]).size);
  if ([ "image/jpeg", "image/png"].includes(file)) {
    console.log("valid din check file size");
    valid = false;
  }

  return valid;
}

const validationSchema = yup.object({
  name: yup.string()
  .required("please enter a product name")
  .min(3, "name too short")
  .max(10, "mustbe no more than 10 characters"),
email: yup.string().email("enter validd email").required("please enter a email ")
.min(5, "email too short"),
// newPassword:yup.string().required("please enter a password ")
// .min(8, "email too password"),
// oldPassword:yup.string().required("please enter a password ")
// .min(8, "email too password"),
// confirmPassword:yup.string().required("please enter a password ")
// .min(8, "email too password"),

// password:yup.string().required("please enter a password ")
// .min(8, "email too password"),
//   images: yup.array().of(
//     // Yup.string().required("must be a type of string of base64 URL")
//     yup.mixed()
//       .required("A file is required")
//       .test(
//         "fileSize",
//         "File too large",

//         // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
//         checkforSIzeOfFiels
//       )
//       .test(
//         "is-big-file",
//         "VALIDATION_FIELD_FILE_WRONG_TYPE",
//         checkIfFilesAreCorrectType
//       )
//   ),
images:yup.string().required("please enter a image ")
.test(
          "fileSize",
          "File too large",
  
          // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
          checkforSIzeOfFiels
        )
        .test(
          "is-big-file",
          "VALIDATION_FIELD_FILE_WRONG_TYPE",
          checkIfFilesAreCorrectType
        )

  })



  


  
const validationSchemaForPassword = yup.object({
//   name: yup.string()
//   .required("please enter a product name")
//   .min(3, "name too short")
//   .max(10, "mustbe no more than 10 characters"),
// email: yup.string().email("enter validd email").required("please enter a email ")
// .min(5, "email too short"),
newPassword:yup.string().required("please enter a password ")
.min(8, "passs should be a atlest eight characters"),
oldPassword:yup.string().required("please enter a password ")
.min(8, "passs should be a atlest eight characters"),
confirmPassword:yup.string().required("please enter a password ")
.min(8, "passs should be a atlest eight characters"),

// password:yup.string().required("please enter a password ")
// .min(8, "email too password"),
//   images: yup.array().of(
//     // Yup.string().required("must be a type of string of base64 URL")
//     yup.mixed()
//       .required("A file is required")
//       .test(
//         "fileSize",
//         "File too large",

//         // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
//         checkforSIzeOfFiels
//       )
//       .test(
//         "is-big-file",
//         "VALIDATION_FIELD_FILE_WRONG_TYPE",
//         checkIfFilesAreCorrectType
//       )
//   ),
// images:yup.string().required("please enter a image ")
// .test(
//           "fileSize",
//           "File too large",
  
//           // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
//           checkforSIzeOfFiels
//         )
//         .test(
//           "is-big-file",
//           "VALIDATION_FIELD_FILE_WRONG_TYPE",
//           checkIfFilesAreCorrectType
//         )

  })


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});




// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.primary,
// }));

const resizeFile = (file:File) =>
new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    300,
    300,
    "JPEG",
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    "base64"
  );
});

const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    loading: userLoading,
    error: userError,
    message:userMessage
  } = useSelector((state: RootState) => state.user);



  const [userImage, setuserImage] = useState("");
  const [imageBuffer, setimageBuffer] = useState("")
  const [opnEditDiv, setopnEditDiv] = useState(false)

  const [openPasswordEdit, setopenPasswordEdit] = useState(false)

  const handleFileUpload = async(event:React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const fileAsDATAURl = await resizeFile(event.target.files[0]!);
    setimageBuffer(  fileAsDATAURl as string)
    setopnEditDiv(true)

    
    // const reader =  new FileReader();

//   reader.onloadend = () => {
//     if(reader.result){
//         setuseimageBugger(  reader.result.toString() )
//       console.log(reader.result.toString());
//       console.log("using commin reader");
//     }
    
//   }
    
//   reader.readAsDataURL(event.target.files[0]);

}
   
const formik = useFormik({
  initialValues: {
    name:"",
    email:"",
    // newPassword:"",
    // oldPassword:"",
    // confirmPassword:"",
    images:"",
    isImageChanged:false,
 
  },
  validationSchema: validationSchema,
  // validateOnMount:false,
//  isInitialValid:false,

validate:(values)=>{
const errors:any ={}

if(!values.images){
errors.images = "not enought images"


}
if(values.images && values.images?.length ===0){
errors.images = "not enought images"
}

return errors
},

  onSubmit: (values) => {

   console.log({values});

   const myForm = new FormData();

   myForm.append("name", values.name);
   myForm.append("email", values.email);
  
  //  myForm.append("newPassword", values.newPassword);
  //  myForm.append("confirmpassword", values.confirmPassword);
  //  myForm.append("oldPassword", values.oldPassword);


   // myForm.append("images", product.images);
  //  myForm.append("images", JSON.stringify(imageUrl));
  //  myForm.append("images", JSON.stringify(imageUrl));
  //  myForm.append("images", JSON.stringify(imageUrl));


  if(formik.values.images === user?.avatar.url){
    formik.values.isImageChanged = false
  }else{
    formik.values.isImageChanged = true

  }
   myForm.append("images",JSON.stringify(values.images!));
   myForm.append("isImageChanged",String(values.isImageChanged));


console.log(formik.values);


dispatch(updateTheUserDetails(myForm))

  },
});

console.log(formik);


useEffect(() => {
  formik.values.images =imageBuffer
}, [imageBuffer])




const formikForPassword = useFormik({
  initialValues: {
    // name:"",
    // email:"",
    newPassword:"",
    oldPassword:"",
    confirmPassword:"",
    // images:"",
 
  },
  validationSchema: validationSchemaForPassword,
  // validateOnMount:false,
//  isInitialValid:false,

validate:(values)=>{
const errors:any ={}
console.log(values);

// if(!values.images){
// errors.images = "not enought images"


// }
// if(values.images && values.images?.length ===0){
// errors.images = "not enought images"
// }

return errors
},

  onSubmit: (values) => {

   console.log({values});

   const myForm = new FormData();

  //  myForm.append("name", values.name);
  //  myForm.append("email", values.email);
  
   myForm.append("newPassword", values.newPassword);
   myForm.append("confirmPassword", values.confirmPassword);
   myForm.append("oldPassword", values.oldPassword);


   // myForm.append("images", product.images);
  //  myForm.append("images", JSON.stringify(imageUrl));
  //  myForm.append("images", JSON.stringify(imageUrl));
  //  myForm.append("images", JSON.stringify(imageUrl));
  //  myForm.append("images",JSON.stringify(values.images!));
  

console.log(formikForPassword.values);


dispatch(changePasswordOfTheUser(myForm))

  },
});












const editUserButtonClicked =(_event:React.MouseEvent)=>{
  setopnEditDiv(!opnEditDiv)


}

const onUpdatepasswordciked =(event:React.MouseEvent)=>{
  console.log(event);
  setopenPasswordEdit(!openPasswordEdit)


}









  useEffect(() => {
    if (!user) {
      dispatch(getAutheticatedUserME());
      // dispatch(resetSingleUserMessage())
      

    }
    if(userError){
      toast.error(userError)
    }
  }, [userError]);
  useEffect(() => {
    if(userMessage){
      toast.success(userMessage)
      dispatch(resetSingleUserMessage())
    }
   
  }, [userMessage])
  

  useEffect(() => {
    setuserImage(user?.avatar.url!);
    if(user){
      formik.values.email = user?.email
      formik.values.name = user?.name
      formik.values.images = user?.avatar.url
       

    }


  }, [user]);

  return (
    <React.Fragment>
      {userLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {/* <Container sx={{mt:2}}>
 <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12">
          <Item>{user && user.name}</Item>
        </Box>
        <Box  gridRow="span 3" gridColumn="span 4"  height={"50vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} >
          <Item><img src={user? user?.avatar?.url!:""} width={"auto"}  /></Item>
        </Box>
        <Box gridColumn="span 8">
          <Item>Email -- {user && user.email}</Item>
        </Box>
        <Box gridColumn="span 8">
          <Item>Role-{user && user.role}</Item>
        </Box>
        <Box gridColumn="span 8">
          <Item>id - -{user && user._id}</Item>
        </Box>
      </Box>
    </Box>

 </Container>
        */}
        <Helmet title='Edit user page'>
            
            </Helmet>

          <div className="main__account_page_div">
            <div className="main__account_page_div__heading">
              <Typography variant="h5" textAlign={"center"}>
                {" "}
                Account Details Page{" "}
              </Typography>

              <Typography variant="h5" textAlign={"center"}>
                {" "}
                {user && user.name}{" "}
              </Typography>
            </div>
            <div className="main__account_page_div_sub_div">
              <div className="main__account_page_div_sub_div1">
                <div className="main__account_page_div_sub_div1_image">
                <img
                  src={userImage}
                  alt="user image"
                  className="account_image_class"
                />
                </div>
             
                 <Button variant="contained" component="label" >
                 <VisuallyHiddenInput type="file"      accept='/image*' onChange={handleFileUpload}/>
                  Change Image</Button>
              </div>



              <div className="main__account_page_div_sub_div2">
                <ul>
                  <li>Name : {user && user.name} </li>
                  <li>Email : {user && user.email} </li>
                  <li>Role : {user && user.role} </li>
                  {/* <li>{user && user._id} </li> */}
                </ul>
                <Stack direction={"row"} spacing={1}>
                <Button  onClick={editUserButtonClicked} variant="contained"> Edit user </Button>
                <Button  onClick={onUpdatepasswordciked} variant="contained"> Change password </Button>
                </Stack>
            

              </div>
            </div>
           
<div>
  {opnEditDiv && (<div className="edituserImageBuffer">
  
  
  {imageBuffer && <div className="edituserImageBuffer_image">
    
       <img src={imageBuffer} />
    </div>}
    <div className="edituserImageBuffer_userDetials">
        <Box component={"form"}
        display={'flex'}
        justifyContent={"center"}
        alignItems={"center"}
        width={"80vw"}
        height={"auto"}
        flexDirection={"column"}
        margin={"auto"}
        onSubmit={formik.handleSubmit}
        >
           
        <TextField

type="text"
name="name"

placeholder="enter product name"
title="name"

sx={{mt:2}}

fullWidth
value={formik.values.name}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name || "enter product name"}
/>
      <TextField

type="email"
name="email"

placeholder="enter user email"
title="email"

sx={{mt:2}}

fullWidth
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email || "enter user email"}
/>







<Button    variant="contained" type="submit" disabled={false}
     sx={{my:2}}
     
     fullWidth
     >
      Edit user
     </Button>





        </Box>
    </div>

  </div>)
    }

  {
    openPasswordEdit && <div> 

<Box component={"form"}
        display={'flex'}
        justifyContent={"center"}
        alignItems={"center"}
        width={"80vw"}
        height={"auto"}
        flexDirection={"column"}
        margin={"auto"}
        onSubmit={formikForPassword.handleSubmit}
        >
           
  


<TextField

type="password"
name="newPassword"

placeholder="enter user newPassword"
title="newPassword"

sx={{mt:2}}

fullWidth
value={formikForPassword.values.newPassword}
onChange={formikForPassword.handleChange}
onBlur={formikForPassword.handleBlur}
error={formikForPassword.touched.newPassword && Boolean(formikForPassword.errors.newPassword)}
helperText={formikForPassword.touched.newPassword && formikForPassword.errors.newPassword || "enter user new Password"}
/>


<TextField

type="password"
name="confirmPassword"

placeholder="enter user confirmPassword"
title="confirmPassword"

sx={{mt:2}}

fullWidth
value={formikForPassword.values.confirmPassword}
onChange={formikForPassword.handleChange}
onBlur={formikForPassword.handleBlur}
error={formikForPassword.touched.confirmPassword && Boolean(formikForPassword.errors.confirmPassword)}
helperText={formikForPassword.touched.confirmPassword && formikForPassword.errors.confirmPassword || "enter user confirmPassword"}
/>

<TextField

type="password"
name="oldPassword"

placeholder="enter user oldPassword"
title="oldPassword"

sx={{mt:2}}

fullWidth
value={formikForPassword.values.oldPassword}
onChange={formikForPassword.handleChange}
onBlur={formikForPassword.handleBlur}
error={formikForPassword.touched.oldPassword && Boolean(formikForPassword.errors.oldPassword)}
helperText={formikForPassword.touched.oldPassword && formikForPassword.errors.oldPassword || "enter user oldPassword"}
/>




<Button    variant="contained" type="submit" disabled={false}
     sx={{my:2}}
     
     fullWidth
     >
     Change Password
     </Button>





        </Box>


    </div>

  }


</div>
            
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AccountPage;
