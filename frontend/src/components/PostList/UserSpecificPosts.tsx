
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from "../../redux/store";
// import { getALlpostPerTheUser } from '../../redux/reducers/userSlice';
import {  selectPostByIDUsingCreateSelector } from '../../redux/reducers/postSlice';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const UserSpecificPosts = () => {
    const {userId}  = useParams()
    // const user = useSelector((state: RootState) =>getALlpostPerTheUser(state,userId!) );
    //  const postsPerUser = useSelector((state:RootState)=>{
    //     const allposts = selectAllPosts(state)
    //     return allposts.filter(post=>String(post.userId )=== String(userId))
    //  })
    
     const postsperUser22 = useSelector((state:RootState)=>selectPostByIDUsingCreateSelector(state,String(userId)))
     console.log({postsperUser22})

     const columns: GridColDef[] = [
        { field: 'id', headerName: 'postId', width: 90 },
        {
          field: 'title',
          headerName: 'Title',
          width: 200,
          editable: false,
        },
        {
            field: 'body',
            headerName: 'body',
            width: 200,
            editable: false,
          },
        {
            field: 'goto',
            headerName: 'See post',
            width: 300,
            editable: false,
            renderCell: (params:GridRenderCellParams<any,string>) =>
            <Link to={`/post/${params.row.id}`}> see posts of {params.row.id} </Link>
          },
     
      ];
      interface rowType{
        id:string,
        title:string,
        body:string,
        goto:string
       }
        const rows:rowType[] =[]
      
        postsperUser22.forEach(post=>{
        rows.push({id:String(post.id), title:post.title, body:post.body,goto:  "see all post for this user" })
      })


  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
  )
}

export default UserSpecificPosts