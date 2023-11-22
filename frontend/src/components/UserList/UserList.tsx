import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
// import {  fetchProducts22, resetAllProductsReducer } from '../../redux/reducers/productReducer22'
import Loading from '../Loading/Loading'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Box, Button } from '@mui/material'
// import LaunchIcon from '@mui/icons-material/Launch';
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./UserList.scss"
// import clsx from 'clsx';

// import BuildIcon from '@mui/icons-material/Build';
import { getAllUsersInForntEnd } from '../../redux/reducers/allUsers'
import { changeUserRoleAdmin, delteTheUserByAdmin, resetSingleUserMessage } from '../../redux/reducers/userSlice22'
// import { resetMessageForSingleProductReducer } from '../../redux/reducers/singleProductReducer'



const UserList = () => {
    // const products = useSelector(getAllProducts)
    const dispatch = useDispatch<AppDispatch>()
     const {allUsers, loading:allUsersLoading } = useSelector((state:RootState)=>state.allUsers)
  const{message:singleUserMessage, loading:singleUserLoading, user} = useSelector((state:RootState)=>state.user)

useEffect(() => {
// console.log("alll dispathed ffffff in forntend");

dispatch(getAllUsersInForntEnd())
// console.log("alll dispathed in forntend");
}, [])

useEffect(() => {
toast.success(singleUserMessage)
dispatch(resetSingleUserMessage())
dispatch(getAllUsersInForntEnd())
}, [singleUserMessage])


     const deleteUserFromListASAdmin =(id:string)=>{
 console.log(id);
 
let reespnonse =   window.confirm(`do you want to delete the user` )
if(reespnonse){
 dispatch(delteTheUserByAdmin({id}))

}
     }

const ChnageRoleForUSer=(id:string)=>{

    dispatch(changeUserRoleAdmin({id})) 

}
   
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID',
       width: 90   
       , headerAlign: "center",
      align: "center",},
      {
        field: 'name',
        headerName: 'User name',
        width: 150,
        editable: true,
        headerAlign: "center",
        align: "center",
        headerClassName: 'headClass',
      //   resizable: true 
        
      },
      {
        field: 'email',
        headerName: 'email',
        width: 150,
        editable: true,
        headerAlign: "center",
        align: "center",
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 110,
        editable: true,
        headerAlign: "center",
        align: "center",
      },
      {
          field: 'image',
          headerName: 'Image',
          width: 110,
          editable: true,
          headerAlign: "center",
          align: "center",
          renderCell:(params)=>{
            // console.log("pramsms in render", params);
            return (
                // <Avatar src={params.row.avatar.url}/>
                <>
                 <Avatar src={params.row.image}/>
                 
                </>
            )
          }
        //   cellClassName: (params: GridCellParams<any, number>) => {
        //     if (params.value == null) {
        //       return '';
        //     }
        //       console.log(params.row.id);
        //     return clsx('super-app', {
        //       negative: params.value < 10,
        //       positive: params.value > 10,
        //     });
        //   },
        },
    
      {
        field: 'actions',
        headerName: 'actions',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
        // flex:1,
      
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
        //  console.log(params);
          return (
              <>
                {/* <Link to={`/admin/user/${params.row.id}`}>
              <BuildIcon />
            </Link> */}
            <Box display={"flex"} gap={2} justifyContent={"center"} alignItems={"center"}>
            <Button variant="contained" onClick={()=>{
              // console.log(params);
              ChnageRoleForUSer(params.row.id)
              
            }}
            disabled={params.row.id === user?._id}
            >
              change Role
            </Button>
            <Button variant="contained" onClick={()=>{
              // console.log(params);
              deleteUserFromListASAdmin(params.row.id)
            }}
            disabled={params.row.id === user?._id}
            
            >
              Delete
            </Button>
            </Box>
            </>
          );
        },
        
      },
    ];
    





    // type ROwType = Omit<ProductTypeFrontend , "reviews" |"images"| "numberOfReviews" |"createdAt" |"user" >

    interface ROwType  {
      
       email:string
       role:string
       id:string
       name:string
       image:string,
       index:number,
    } 
    const rows:ROwType[]= []

    allUsers && allUsers.forEach((singleUser, index)=>{
        rows.push({
            email:singleUser.email,
            role:singleUser.role,
            id:singleUser._id,
            name:singleUser.name,
            image:singleUser.avatar.url,
            index:index,
     
        })
    })
 


  return (
    <React.Fragment>
        {(allUsersLoading ||singleUserLoading )?<Loading/> :
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
  getRowClassName={(params) => `super-app-theme--${params.row.index%2 ===0}`}
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


export default UserList