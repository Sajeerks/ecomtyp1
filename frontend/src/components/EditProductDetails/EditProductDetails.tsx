import { Box,Modal, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
// import { ProductTypeFrontend } from '../../redux/reducers/productReducer22'
// import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {  editSingleProductDetails, getSingleProductDetails, resetSingleProductReducer } from '../../redux/reducers/singleProductReducer';
// import MuitextInputEditProduct from './MuitextInputEditProduct';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {
// //   Formik,
// //   Form,
// //   useFormikContext,
// //   useField,
// //   Field,
//   ErrorMessage,
// } from "formik";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import {
//   EditorState,
//   ContentState,
//   convertFromHTML,
//   convertToRaw,
//   convertFromRaw,
// } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

import Resizer from "react-image-file-resizer";
import { toast } from 'react-toastify';

// import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { Helmet } from 'react-helmet-async';
import Loading from '../Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { getAutheticatedUserME } from '../../redux/reducers/userSlice22';

function checkforSIzeOfFiels(file:any) {
  let valid = true;
  // console.log("fieks----", file);
  // if (files) {
  // files.map(file => {
  // console.log("size of the file checkforSIzeOfFiels ", file.size)
  // const size = file.size / 1024 / 1024;
  // if (size > 1) {
  //   valid = false;
  // }

  // })
  // }
  if( new Blob([file]).size <= 1024*1027/1000000){
    valid = false
   }
   return valid;
  
}
function checkIfFilesAreCorrectType(file:any) {
  // console.log(file);
  let valid = true;

    // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {

  if (["application/pdf", "image/jpeg", "image/png"].includes(file)) {
    console.log("valid din check file size");
    valid = false;
  }

  return valid;
}


// function checkforSizeOfSingleFIle(file:any){
//  let valid = false
//  console.log("new Blob([file]).size", new Blob([file]).size);
//  console.log(1024*1027/1000000);
//  if( new Blob([file]).size <= 1024*1027/1000000){
//     valid = false
//    }
//    return valid;
// }


const validationSchema = yup.object({
  name: yup.string()
  .required("please enter a product name")
  .min(2, "name too short"),
description: yup.string().required("please enter a product description")
.min(10, "description too short"),
price: yup.number()
  .integer()
  .test(
    "Is positive?",
    "ERROR: The number must be greater than 0!",
    (value) => value! > 0
  )
  .required("please enter a product price")
  .min(1),category: yup.string().required("please enter a product category"),
  stock: yup.number()
    .integer()
    .test(
      "Is positive?",
      "ERROR: The number must be greater than 0!",
      (value) => value! > 0
    )
    .required("please enter a product price")
    .min(1),
    // images:yup.string().required("an image is required").test(
    //    "length",
    //    "filetoolarge",
    //    function(file){

    //     let valid = false
    //     console.log("new Blob([file]).size", new Blob([file]).size);
    //     console.log(1024*1024);
    //     if( new Blob([file]).size <= 1024*1024){
    //        valid = true
    //       }
    //       return valid;


    //    }
     
    // )

    images: yup.array().of(
      // Yup.string().required("must be a type of string of base64 URL")
      yup.mixed()
        .required("A file is required")
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
    ),


});




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



// const enum categories {
//   sports = "Sports",
//   electronics = "Electronics",
//   cloths = "Cloths",
//   furniture = "Furniture",
//   food="Food",

// }

const categories =[
    "sports" ,
  'electronics',
  "cloths",
  "furniture",
  "food",
]


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







  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: "60vw",
  //   maxHeight:"80vh",
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };
  
  







const EditProductDetails = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {user, loading:userLoading, error:userError} = useSelector((state:RootState)=>state.user)
  const {product, loading:productLoading, error:productError, message:productMessage} = useSelector((state:RootState)=>state.product)

  const [existingImagesArrayFormProduct, setexistingImagesArrayFormProduct] = useState([
  {  public_id: "",
    url: ""}
  ])

  const navigate = useNavigate()
  const {productId} = useParams()
  const themer = useTheme()
//   console.log({productId});
  useEffect(() => {

    if(productError){
      toast.error(productError)
    }  
     if(userError){
      toast.error( "not logged in " + userError)
    }




  }, [user,userError, product, productError])


useEffect(() => {
  if(productMessage){
    toast.success("new product edited successfully")
    dispatch(resetSingleProductReducer())
    
  }

  return () => {
    dispatch(resetSingleProductReducer())
  }
}, [productMessage])



  useEffect(() => {
    if(productId){
        dispatch(getSingleProductDetails(productId))

    }
  
  }, [])
  useEffect(() => {
    dispatch(getAutheticatedUserME())
    if(!user){
      navigate("/login")
    }
  }, [])
  
  

  
//      const [newProductData, setnewProductData] = useState({
// ...product
//      })



    //  interface StateFOrRichtextEdotior {
    //   editorState: EditorState;
    //   editMode: boolean;
    // }

  //    const editorREF= useRef(null)
  //    const [defaultValueState, setdefaultValueState] = useState("");
  //    const [editorState, seteditorState] = useState(() =>
  //    EditorState.createEmpty()



  //   //  EditorState.createWithContent(
  //   //   ContentState.createFromText("abcde")
  //   // )

  //  );
   const [imageArray, setImageArray] = useState<any[]>();
   
    
//    const onEditorStateChange = (editorState: EditorState) => {
//     seteditorState(editorState);
//   };

//   function createMarkup() {
//     // return {
//     //   __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
//     // };
//     // return {__html: "<p>this is th munns <strong>sajeer</strong></p>"};
// if( editorRef.current){
//   return{
//     __html:  editorRef.current.getContent()
//   }
// }
    
//   }


  const isMobileView= useMediaQuery('(min-width:600px)');

  useEffect(() => {
  
      
        // seteditorState(
        //   EditorState.createWithContent(
        //     ContentState.createFromBlockArray(
        //       // convertFromHTML()
        //     )
        //   )
        // );
    
    // console.log('second useeffect useEffect');

    // if (formikRef.current) {
    //   formikRef.current.setFieldValue(
    //     "images",
    //      [...imageArray]
    //   );

    // }

    // console.log({imageArray});

    formik.values.images= imageArray!
    

    return () => {};
  }, [imageArray]);


useEffect(() => {
    if(product){
        formik.values.name = product?.name
        formik.values.category = product?.category
        formik.values.stock = product?.stock
        formik.values.description = product?.description
        formik.values.price = product?.price

        setexistingImagesArrayFormProduct(product.images)



    }

}, [product])



  const editorRef =  useRef<TinyMCEEditor | null>(null);
  //  const log = () => {
  //    if (editorRef?.current) {
  //      console.log(editorRef.current.getContent());
  //    }
  //  };

// useEffect(() => {
//   log()
//   formik.setFieldValue("description",editorRef.current?.getContent() )
//   return () => {
    
//   }
// }, [editorRef.current?.getContent()])

const [_value, setValue] = useState('<p>The quick brown fox jumps over the lazy dog</p>');
const [_text, setText] = useState('');

 


//     const changehandlerFuncionInLogin=(e:React.ChangeEvent<HTMLInputElement>)=>{
//       setnewProductData({...newProductData, [e.target.name]:e.target.value})
     
// // console.log(formik.values);
//     }
//     const submitLoginFormHandler=(e:React.FormEvent)=>{
//     e.preventDefault()
//       console.log({newProductData});
// //  dispatch(createSingleNewProduct(newProductData))
      
    
//     }

  // const handleSelectChange =()=>{
    
  // }







    // const [imageUrl, setImageUrl] = useState< string | null>(null);
    // const [file, setFile] = useState<File>();
    // const [imageUrlResult, setimageUrlResult] = useState("")
    // const [imageError, setimageError] = useState("")





    ///formaidl

console.log({existingImagesArrayFormProduct});
console.log({imageArray});


    
    const formik = useFormik({
      initialValues: {
        name: "",
        price:0,
        description:"",
        category:"",
        // images:[{
        //   public_id:uuidv4(),
        //   url:"https://images.pexels.com/photos/5929944/pexels-photo-5929944.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          
        // }],
        images:[""],
        stock:0,
        user:"",
      },
    //   initialValues: {...product!},
      validationSchema: validationSchema,
      // validateOnMount:false,
    //  isInitialValid:false,
    
validate:(values)=>{
  const errors:any ={}
  if(values.description  && values.description.length <50){
    errors.description = "not enought length"
  }
  // if(!values.images){
  //   errors.images = "not enought images"

   
  // }



    if (imageArray) {
      if(existingImagesArrayFormProduct?.length + imageArray.length ===0){
        errors.images = "not enought images"
      }
    }else if( existingImagesArrayFormProduct?.length ===0){
      errors.images = "not enought images"
    }

  
 
  return errors
},
    
      onSubmit: (values) => {
        console.log("sbmittingumit");
      //  console.log({values});

       const myForm = new FormData();

       myForm.append("name", values.name);
       myForm.append("price", values.price.toString());
      
       myForm.append("category", values.category);
       myForm.append("stock", values.stock.toString());
       myForm.append("description", values.description);
   
       // myForm.append("images", product.images);
      //  myForm.append("images", JSON.stringify(imageUrl));
      //  myForm.append("images", JSON.stringify(imageUrl));
      //  myForm.append("images", JSON.stringify(imageUrl));
    //    myForm.append("images",JSON.stringify(values.images!));
       myForm.append("existingImages",JSON.stringify(existingImagesArrayFormProduct));
       myForm.append("newImages",JSON.stringify(imageArray));



      //  for (var pair of myForm.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
//   console.log(formik.values);
let id = productId
if(id){
  dispatch(editSingleProductDetails({id,myForm}))
console.log("dispatch edit");
// dispatch(resetSingleProductReducer())
}

      },
    });







    let masterFileArray:any[] = [];
    const handleFileUpload = async(event:React.ChangeEvent<HTMLInputElement>) => {
      // event.persist();
      console.log("handle ile upload clicked");
      
      if (!event.target.files) return;
  
      // const file  = event.target.files[0]  ;
      const files  = event.target.files ;
      if(files.length>5){
        toast.error("please select less than five images")
        return
      }
      if(imageArray){
        if(files.length + imageArray?.length >5){
          toast.error("please select less than five images")
          return
        }
        if(files.length + imageArray?.length ===0){
          toast.error("please select at least one imge images")
          return
        }
  
      }
   

      for (let index = 0; index < files.length; index++) {
        // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
        if(files.item(index)?.size! > 500*1000){
          // console.log("files.item(index)?.siz---",files.item(index)?.size);
        const fileAsDATAURl = await resizeFile(files.item(index)!);
        masterFileArray.push(fileAsDATAURl);
      }else{
          
       
        const readTHeImagFile=()=>{
          return new Promise((resolve) => {
            console.log("readTHeImagFile");
            const reader = new FileReader()
            reader.onloadend = () => resolve(masterFileArray.push(reader.result!.toString()))
            reader.readAsDataURL(files.item(index)!);
          })
        }
       await readTHeImagFile()
       
  // const reader =  new FileReader();
  
  //     reader.onloadend = () => {
  //       if(reader.result){
  //       masterFileArray.push(reader.result.toString())
  //         console.log(reader.result.toString());
  //         console.log("using commin reader");
  //       }
        
  //     }
        
  //     reader.readAsDataURL(files.item(index)!);

       
      }
   
    const imaageEditedSet = new Set(masterFileArray);


    masterFileArray = Array.from(imaageEditedSet);
   

    setImageArray([...masterFileArray])
    console.log({masterFileArray});
    console.log({imageArray});
  
    
    // formik.values.images= masterFileArray
      // setFile(event.target.files[0])
      // const reader = new FileReader();
  
      // reader.onloadend = () => {
      //   if(reader.result){
      //     setImageUrl(reader.result.toString());
        
      //   }
   
      
        
      // };
  
      // reader.readAsDataURL(file);
    
setTimeout(() => {
   formik.setFieldTouched("images")
}, 500);
    

    };

    }


    
console.log(formik);
  const [open, setOpen] = useState(false);
  const [_themodalImage, setthemodalImage] = useState("")
  const [modalIndex, setmodalIndex] = useState(0)
  const [openExtingImageModal, setopenExtingImageModal] = useState(false);
  const [extingImageModalIndex, setextingImageModalIndex] = useState(0)

  const ImageModler =(_event:React.MouseEvent)=>(imageUrl:string, index:number)=>{
// console.log(imageUrl!);
// console.log("cics");
console.log({index});
setOpen(!open)
console.log({open});
setthemodalImage(imageUrl)
setmodalIndex(index)
  }

const deltedImagesAlreaySaved =(_event:React.MouseEvent)=>(public_id:string, index:number)=>{
    console.log(public_id);
    setopenExtingImageModal(true)
    setextingImageModalIndex(index)
}


// useEffect(() => {

//   // if( formik.errors.images){
//   //   setimageError( formik.errors.images)
//   // }else{
//   //   setimageError("")
//   // }
// if(imageUrl){
//   formik.values.images = imageUrl
//   formik.touched.images = true
//   // formik.errors.images=  undefined
//   // setimageError("")
// }

//   return () => {
   
//   }
// // }, [formik.errors.images, imageUrl])
// }, [ imageUrl])





// Object.keys(newProductData).forEach((key)=>{
//   console.log(key);
//   const keyavle = key
//   console.log(newProductData[keyavle as keyof newProductData);
  
// }
  
// )

// for (const key in newProductData) {

//   console.log(`${key}: ${newProductData[key as keyof typeof newProductData]}`);
//   formik.values[key as keyof typeof newProductData] = newProductData[key as keyof typeof newProductData]
// }

// const test = <T extends Record<string, unknown>>(obj: T) => {
//   return (Object.keys(obj) as Array<keyof T>).map(key => obj[key])
//  }

//  console.log("test",test(newProductData));


    // useEffect(() => {
    //   if(user?._id){
    //     setnewProductData({...newProductData,user:user?._id})
      
    //   }
    //   return () => {
        
    //   }
    // }, [user?._id])
    
  return (

  <React.Fragment>   
{(userLoading || productLoading) ?<Loading/> :
    
  <React.Fragment>   
    <Container sx={{height:"auto"}}>
       <Helmet>
        <title>EDIT Product</title>
       
      </Helmet>
    <Box component={"form"} 
    
    // onSubmit={submitLoginFormHandler} 
    onSubmit={formik.handleSubmit}  


display={"flex"}
justifyContent={"center"}
alignItems={"center"}
flexDirection={"column"}
margin={"5vmax"}
>

 
   <TextField  
    // onChange={changehandlerFuncionInLogin}
    // value ={newProductData.name}
    // helperText="enter valid name"
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
    // onChange={changehandlerFuncionInLogin}
    // helperText="enter valid price"
    // value ={newProductData.price}
     type="number"
     name="price"
     placeholder="enter product price"
     title="price"
     fullWidth
     sx={{mt:2}}

     value={formik.values.price}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.price && Boolean(formik.errors.price)}
     helperText={formik.touched.price && formik.errors.price || "enter product price"}

   />
         <TextField 
    // onChange={changehandlerFuncionInLogin}
    // value ={newProductData.stock}
    // helperText="enter valid stock"


     type="number"
     name="stock"
     placeholder="enter product stock"
     title="stock"
     fullWidth
     sx={{mt:2}}


     value={formik.values.stock}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.stock && Boolean(formik.errors.stock)}
     helperText={formik.touched.stock && formik.errors.stock || "enter product stock"}
   />


{/* <Editor
      // editorState={EditorState}
  // wrapperClassName="wrapper-class"
  // editorClassName="editor-class"
  // toolbarClassName="toolbar-class"
  // wrapperStyle={<wrapperStyleObject>}
  // editorStyle={<editorStyleObject>}
  // toolbarStyle={<toolbarStyleObject>}
ref={editorREF}
  // onChange={(e) => {
  //   // desctiptionChangeHandler(e);
  //   formik.setFieldValue(
  //     "description",
  //     draftToHtml(
  //       convertToRaw(
  //         editorState.getCurrentContent()
  //       )
  //     )
  //   );
  // }}
  // editorState={
  //   editorState ? editorState : "hi"
  // }
  // initialEditorState={editorState}
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassNameInEdit3"
  onEditorStateChange={onEditorStateChange}
  // onEditorStateChange={seteditorState}

  // toolbar={{
  //   inline: { inDropdown: true },
  //   list: { inDropdown: true },
  //   textAlign: { inDropdown: true },
  //   link: { inDropdown: true },
  //   history: { inDropdown: true },
  // }}
/> */}





<Box>
<Editor
apiKey='0oc6cviwzuenmvc7cenc4jun2n8rjrkqpqyc6yudnkuim9zc'
         onInit={(_evt, editor) => editorRef.current = editor}
         initialValue={formik.values.description}
         init={{
           height: 200,
           menubar: false,
          
          //  plugins: [
          //    'advlist autolink lists link image charmap print preview anchor',
          //    'searchreplace visualblocks code fullscreen',
          //    'insertdatetime media table paste code help wordcount'
          //  ],
          //  toolbar: 'undo redo | formatselect | ' +
          //  'bold italic backcolor | alignleft aligncenter ' +
          //  'alignright alignjustify | bullist numlist outdent indent | ' +
          //  'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
           plugins:
             "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
           toolbar:
             "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
           image_advtab: true
         }}

         onEditorChange={(newValue, editor) => {
         
          setValue(newValue.replace(/<(.|\n)*?>/g, ''));
          // console.log({newValue})
          // console.log({value});
          // ;
          

          setText(editor.getContent({format: 'text'}));
          formik.values.description = newValue
          
           setTimeout(() => {
            formik.setFieldTouched('description')
           }, 500);
        }}
        />

</Box>
<Box>
{formik.errors.description! && <Typography color={themer.palette.error.main} variant='h5'>{formik.errors.description}</Typography>}
</Box>
{/* <Box>

{editorRef.current && <div dangerouslySetInnerHTML={createMarkup()} ></div>}



</Box> */}
{/* <Box>
{editorState && <div dangerouslySetInnerHTML={{__html:editorState.getCurrentContent()}}></div>}
</Box> */}

   {/* <TextField 
    // onChange={changehandlerFuncionInLogin}
    // value ={newProductData.description}
    // helperText="enter valid description"
  
    inputProps={{
      style: {
        height: "10px",
        // display:"none"
        
      },
    }}
  


     type="text"
     name="description"
     placeholder="enter product description"
     title="description"
     fullWidth
     sx={{mt:2}}

   value={editorRef.current?.getContent().toString()}

      
    //  value={formik.values.description}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.description && Boolean(formik.errors.description)}
     helperText={formik.touched.description && formik.errors.description || "enter product description"}
   /> */}
   {/* <TextField 
    // onChange={changehandlerFuncionInLogin}
    // value ={newProductData.category}
    // helperText="enter valid category"

     
     type="text"
     name="category"
     placeholder="enter product category"
     title="category"
     fullWidth
     sx={{mt:2}}


     value={formik.values.category}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.category && Boolean(formik.errors.category)}
     helperText={formik.touched.category && formik.errors.category || "enter product category"}
   /> */}


<FormControl sx={{ m: 1 , minWidth:"70vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="Category"
          name='category'
        >

          {categories.map((cat)=>(
            <MenuItem key={cat} value={cat} >
              {cat}
            </MenuItem>
          )) }
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem> */}


          categories.
        </Select>
       <span  color={themer.palette.error.main} > <FormHelperText error >{formik.errors.category}</FormHelperText></span>
      </FormControl>



  


  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
  
  
  
  >
      Upload file 
      <VisuallyHiddenInput type="file"    multiple  accept='/image*' onChange={handleFileUpload}/>
    </Button>
{/* {imageError && <Typography color={"primary.error"} variant='h5'>{imageError}</Typography>} */}
<Container sx={{border:`2px solid ${themer.palette.primary.main}`}}>
<Typography textAlign={"center"} variant='h5'>Images NEW</Typography>


{formik.errors.images && <Typography color={themer.palette.error.main} variant='h5'>{formik.errors.images}</Typography>}


<Box maxWidth={"90vw"} maxHeight={"40vh"} overflow={"scroll"} display={"flex"}  flexDirection={"row"} >
  {imageArray?.length!>0 && imageArray?.map((imageUrl, index)=>(


  <Paper sx={{m:1, width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:'center'}} key={index}   >    
  {imageUrl && <img src={imageUrl.toString()}   onClick={(e)=>ImageModler(e)(imageUrl,index)}   alt='new product image' style={{maxHeight:"40vh", maxWidth:"90vw"}}/>}

  {/* <Button key={index} onClick={(e)=>ImageModler(e)(imageUrl,index)} >preivew</Button> */}


  </Paper>
  ))}

</Box>
</Container>
<Container sx={{border:`2px solid ${useTheme().palette.primary.main}`, mt:2}}>
<Typography textAlign={"center"} variant='h5'>Images Already exisiting</Typography>
<Box maxWidth={"90vw"} maxHeight={"40vh"} overflow={"scroll"} display={"flex"}  flexDirection={"row"}>
   {existingImagesArrayFormProduct.length!>0  ? existingImagesArrayFormProduct.map((singleImageExisting, index)=>(
         <Paper sx={{m:1, width:"100%", height:"100%"}} key={index}  >    
         {singleImageExisting && <img src={singleImageExisting.url}  alt={singleImageExisting.public_id} 
         
         onClick={(e)=>deltedImagesAlreaySaved(e)( singleImageExisting.public_id, index)}    style={{maxHeight:"40vh", maxWidth:"90vw"}}/>}
       
         {/* <Button key={index} onClick={(e)=>ImageModler(e)(imageUrl,index)} >preivew</Button> */}
       
       
         </Paper>
   )):<Typography>no existing product images</Typography>}
</Box>

</Container>



<Button  variant="contained" type="submit" disabled={false}
     sx={{mt:2}}
     
     fullWidth
     >
      EDIT Product
     </Button>

</Box>

{(open && imageArray &&  imageArray?.length>0)  && <Modal

open={open}
onClose={()=>{setOpen(false)}}

sx={{background:useTheme().palette.common.white, width:"100vw",height:"100vh", display:"flex"
,justifyContent:"center", alignItems:"center",flexDirection:'column'}}

    >
      <>
     <Box display={"flex"} justifyContent={"center"} alignContent={"center"} maxWidth={"100vw"} flexDirection={isMobileView?"row":'column'}>
     <Button onClick={()=>setmodalIndex( modalIndex=>modalIndex>0?modalIndex-1:0)} variant="contained">{"<<"}</Button> 
     <img style={{maxHeight:"90vh", maxWidth:"80vw", padding:"1vamx"}} src={imageArray && imageArray?.length!>0 && imageArray[modalIndex]!} />
      <Button onClick={()=>setmodalIndex( modalIndex=>modalIndex+1<imageArray?.length!?modalIndex+1:modalIndex)} variant="contained">{">>"}</Button>
     </Box>
     <Button variant="contained" sx={{mt:1}} onClick={()=>{
   console.log(imageArray);
setImageArray(imageArray=>imageArray?.filter(img=>img!== imageArray[modalIndex]))
setmodalIndex(modalIndex=>modalIndex ===0?0:modalIndex-1)
console.log(imageArray);


     }}>Delete Image</Button>
     </>
    </Modal>}




    {(openExtingImageModal && existingImagesArrayFormProduct &&  existingImagesArrayFormProduct?.length>0)  &&  <Modal
 

 open={openExtingImageModal}
 onClose={()=>{setopenExtingImageModal(false)}}

 sx={{background:useTheme().palette.common.white, width:"100vw",height:"100vh", display:"flex"
 ,justifyContent:"center", alignItems:"center",flexDirection:'column'}}
    >
      <>
    
     <Box display={"flex"} justifyContent={"center"} alignContent={"center"} maxWidth={"100vw"} flexDirection={isMobileView?"row":'column'}>
     <Button onClick={()=>setextingImageModalIndex( extingImageModalIndex=>extingImageModalIndex>0?extingImageModalIndex-1:0)} variant="contained">{"<<"}</Button> 
     <img style={{maxHeight:"90vh", maxWidth:"80vw", padding:"1vamx"}} src={existingImagesArrayFormProduct[extingImageModalIndex].url!} />
      <Button onClick={()=>setextingImageModalIndex( extingImageModalIndex=>extingImageModalIndex+1<existingImagesArrayFormProduct?.length!?extingImageModalIndex+1:extingImageModalIndex)} variant="contained">{">>"}</Button>
     </Box>
     <Button variant="contained" sx={{mt:1}} onClick={()=>{
  //  console.log(existingImagesArrayFormProduct);
setexistingImagesArrayFormProduct(existingImagesArrayFormProduct=>existingImagesArrayFormProduct?.filter(img=>img.public_id!== existingImagesArrayFormProduct[extingImageModalIndex].public_id))
setextingImageModalIndex(extingImageModalIndex=>extingImageModalIndex ===0?0:extingImageModalIndex-1)
// console.log(existingImagesArrayFormProduct);


     }}>Delete Image</Button>
     </>
    </Modal>}


</Container>




</React.Fragment>
}

</React.Fragment>
  )
}

export default EditProductDetails




 