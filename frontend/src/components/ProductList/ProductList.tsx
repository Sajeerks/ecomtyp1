import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {  ProductTypeFrontend, fetAllProductsAdmin} from '../../redux/reducers/productReducer22'
import Loading from '../Loading/Loading'
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./ProductList.scss"
import clsx from 'clsx';
import { deleteSingleProduct } from '../../redux/reducers/singleProductReducer'
import BuildIcon from '@mui/icons-material/Build';



const ProductList = () => {
    // const products = useSelector(getAllProducts)
    const dispatch = useDispatch<AppDispatch>()
    const {loading, error, products}= useSelector((state:RootState)=>state.productsreducer)
    const {loading:productLoading, error:productError, product ,message:productMessage}= useSelector((state:RootState)=>state.product)

    const [idChnager, setidChnager] = useState(false)

    const [allproductsstate, setallproductsstate] = useState<ProductTypeFrontend[] |  null >(null)
    



interface IDTyoe{
  id:string
}
    const  deleteProductFromList=({id}:IDTyoe)=>{
    //  console.log(id);
     setidChnager(true)
     dispatch(deleteSingleProduct(id))
  
    }
   
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID',editable: true, width: 90    , headerAlign: "center",
      align: "center",},
      {
        field: 'name',
        headerName: 'product name',
        width: 150,
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: 'headClass',
      //   resizable: true 
        
      },
      {
        field: 'price',
        headerName: 'price',
        width: 150,
        type: 'number',
        editable: true,
        headerAlign: "center",
        align: "center",
      },
      {
        field: 'ratings',
        headerName: 'ratings',
        type: 'number',
        width: 110,
        editable: true,
        headerAlign: "center",
        align: "center",
      },
      {
          field: 'stock',
          headerName: 'stock',
          type: 'number',
          width: 110,
          editable: true,
          headerAlign: "center",
          align: "center",
          cellClassName: (params: GridCellParams<any, number>) => {
            if (params.value == null) {
              return '';
            }
      
            return clsx('super-app', {
              negative: params.value < 10,
              positive: params.value > 10,
            });
          },
        },
        {
          field: 'description',
          headerName: 'description',
      flex:1,
          width: 110,
          editable: true,
          headerAlign: "center",
          align: "center",
        },
        {
          field: 'category',
          headerName: 'category',
      
          width: 110,
          editable: true,
          headerAlign: "center",
          align: "center",
        },
      {
        field: 'actions',
        headerName: 'actions',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
        //  console.log(params);
          return (
              <>
                <Link to={`/product/edit/${params.row.id}`}>
              <BuildIcon />
            </Link>
            <Link to={`/product/${params.row.id}`}>
              <LaunchIcon />
            </Link>
            <Button variant="contained" onClick={()=>{
              // console.log(params);
              deleteProductFromList(params.row)
            }}>
              Delete
            </Button>
            </>
          );
        },
        
      },
    ];
    
    useEffect(() => {
      // dispatch(fetchProducts22({keyword:""}))
      if(typeof product === "string"){
        toast.success(product)
      }
      // dispatch(resetAllProductsReducer())
      // dispatch(resetSingleProductReducer())
      // dispatch(fetchProducts22({keyword:"", page:1,price:[0,99999],ratings:0, category:null}))
      
    }, [ product])
    

useEffect(() => {
  console.log({idChnager});
 
  // dispatch(resetAllProductsReducer())
  // dispatch(fetchProducts22({keyword:"", page:1,price:[0,99999],ratings:0, category:null}))
 

  
}, [idChnager])



useEffect(() => {


    if(error){
        toast.error(error)
    }
    if(productError){
      toast.error(productError)
  }
  // if(typeof product === "string"){
  //   toast.success(product)
  // }
 
}, [error,productError,dispatch ])


useEffect(() => {
  if(productMessage){
    toast.success(productMessage)
    dispatch(fetAllProductsAdmin())
  }

  return () => {
  //  dispatch(resetAllProductsReducer())
  }
}, [productMessage])


useEffect(() => {
  dispatch(fetAllProductsAdmin())
  }, [])

 
  useEffect(() => {
    setallproductsstate(products)
  }, [loading])
  console.log(allproductsstate);

    // type ROwType = Omit<ProductTypeFrontend , "reviews" |"images"| "numberOfReviews" |"createdAt" |"user" >

    interface ROwType  {
        category:string
       price:number
       ratings:number
       stock:number
       id:string
       name:string
       description:string
    } 
    const rows:ROwType[]= []
    allproductsstate && allproductsstate.forEach(product=>{
        rows.push({
            "id":product._id!,
"name":product.name,
"price":product.price,
"ratings":product.ratings,
"stock":product.stock,
"description":product.description,
"category":product.category,


        })
    })
    



  return (
    <React.Fragment>
        {(loading ||productLoading )?<Loading/> :
          <React.Fragment>
             <Box sx={{ height: "90vh", width: '100%' , }}>
      <DataGrid
  experimentalFeatures={{ ariaV7: true }}
  slots={{ toolbar: GridToolbar }}
sx={{
    boxShadow: 2,
    border: 2,
    borderColor: 'primary.light',
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main',
    },
  }}
  getRowClassName={(params) => `super-app-theme_PRODUCR--${params.row.stock<10}`}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
             

            </React.Fragment>
        }


 </React.Fragment>

  )
}

export default ProductList