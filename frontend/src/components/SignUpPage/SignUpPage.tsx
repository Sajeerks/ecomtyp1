import { Box, Button, Container, TextField, Typography, styled, useTheme } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import * as yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { resetSingleUserMessage, signUpNewUser } from '../../redux/reducers/userSlice22';
import { toast } from 'react-toastify';



const SignUpPage = () => {

    const dispatch= useDispatch<AppDispatch>()
    const { message:userMessage} = useSelector((state:RootState)=>state.user)
    

    const [useimageBugger, setuseimageBugger] = useState<string>("")
    const themer = useTheme()
    useEffect(() => {
    if(userMessage){
      toast.warn(userMessage)
      dispatch(resetSingleUserMessage())
    }
    }, [userMessage])
    


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
    password:yup.string().required("please enter a password ")
    .min(8, "email too password"),
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
    


  
    
    

    const handleFileUpload = async(event:React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const fileAsDATAURl = await resizeFile(event.target.files[0]!);
            setuseimageBugger(  fileAsDATAURl as string)
            


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
          password:"",
    
          images:"",
       
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
        
         myForm.append("password", values.password);
     
     
         // myForm.append("images", product.images);
        //  myForm.append("images", JSON.stringify(imageUrl));
        //  myForm.append("images", JSON.stringify(imageUrl));
        //  myForm.append("images", JSON.stringify(imageUrl));
         myForm.append("images",JSON.stringify(values.images!));
  
  
  
  
   dispatch(signUpNewUser(myForm))
  
        },
      });

 useEffect(() => {
     if(useimageBugger){
        formik.values.images = useimageBugger
        formik.setFieldTouched("images")
    }
 }, [useimageBugger])
 
      console.log(formik);
  return (
    <Container  >
        <Helmet title='sign up page'>
            
        </Helmet>
       <Typography textAlign={"center"} variant='h3'> Sign up Page</Typography>

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

<TextField

     type="password"
     name="password"
   
     placeholder="enter  password"
     title="password"

     sx={{mt:2}}
  
     fullWidth
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.password && Boolean(formik.errors.password)}
     helperText={formik.touched.password && formik.errors.password || "enter password "}
   />

<Button sx={{m:1}} component="label" variant="contained" startIcon={<CloudUploadIcon />}
  
  
  
  >
      Upload User Image
      <VisuallyHiddenInput type="file"      accept='/image*' onChange={handleFileUpload}/>
    </Button>


   <Box maxWidth={"90vw"} maxHeight={"30vh"} overflow={"hidden"} >
    {useimageBugger && <img width={"100px"}  src={useimageBugger} alt="new user Image"/>}
   </Box>
{formik.errors.images && <Typography color={themer.palette.error.main}  >{formik.errors.images}</Typography>}

        <Button    variant="contained" type="submit" disabled={false}
     sx={{my:2}}
     
     fullWidth
     >
      SIGN UP
     </Button>
        </Box>

         

    </Container>
  )
}

export default SignUpPage