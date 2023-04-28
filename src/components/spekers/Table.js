import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Lable from '../Lable/StatusLable';
import { baseUrl } from '../../utils/BaseUrl';



export default function DataTable({ row }) {

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: ({ row, value }) => (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Avatar alt={row.name} src={baseUrl + row.photo} />
          <Typography>{value}</Typography>
        </Stack>
      ),
    },
    { field: 'city', headerName: 'Place', width: 150 },
    { field: 'phone_no', headerName: 'Phone No', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Lable value={params.value} />,
    },
  
    {
     
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: ({row}) => (
        <Box>
          <Button color='success' onClick={() => navigate(`/dashboard/speker/edit/${row._id}`)}><VisibilityIcon/></Button>
          <Button onClick={() => navigate(`/dashboard/speker/edit/${row._id}`)}><EditIcon/></Button>
          <Button color='error' onClick={() => deleteSpeker(row._id)}><DeleteIcon/></Button>
        </Box>
      ),
    },
  
  
  ];





  const deleteSpeker = (id)=>{
    console.log();
  }
  const navigate = useNavigate();
  const getRowId = (row) => row.name + row.phone_no;
  const [pageSize, setPageSize] = React.useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Sponsers
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard/spekers/create"
            variant="contained"
            
          >
           + New Sponser
          </Button>
        </Stack>
      <Paper elevation={3} style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          onPageSizeChange={handlePageSizeChange}
          getRowId={getRowId}
          disableSelectionOnClick
          disableColumnFilter
        />
      </Paper>
    </Box>
  );
}
