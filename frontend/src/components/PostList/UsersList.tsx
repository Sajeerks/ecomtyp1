
import { AllusersForPost } from '../../redux/reducers/userSlice'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'userid', width: 90 },
    {
      field: 'name',
      headerName: 'NAME',
      width: 200,
      editable: false,
    },
    {
        field: 'goto',
        headerName: 'See Profile',
        width: 300,
        editable: false,
        renderCell: (params:GridRenderCellParams<any,string>) =>
        <Link to={`/post/user/${params.row.id}`}> see posts of {params.row.name} </Link>
      },
 
  ];


  
const UsersList = () => {
    const allUsers = useSelector(AllusersForPost)
   interface rowType{
    id:string,
    name:string,
    goto:string
   }
    const rows:rowType[] =[]
  
  allUsers.forEach(user=>{
    rows.push({id:String(user.id), name:user.name, goto:  "see all post for this user" })
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

export default UsersList