
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Lable from '../Lable/StatusLable';
import { baseUrl } from '../../utils/BaseUrl';
import axios from '../../utils/axios';
import Loading from '../Loading/Loading';
import { Alert, notifySucess, notifyError } from '../../utils/alert';



export default function DataTable({ row }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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
    
   
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Lable value={params.value} />,
    },
  
    {
    
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => navigate(`/dashboard/sponser/edit/${params.row._id}`)}><EditIcon/></Button>
          <Button onClick={() => deleteSponser(params)}><DeleteIcon/></Button>
        </Box>
      ),
    },
  
  
  ];

  const deleteSponser = async (params) => {
    const id = params.row._id;
    const { isConfirmed } = await Alert('Are you sure?', 'you want to delete this');
    if (!isConfirmed) {
      notifyError('Your action was cancelled');
    } else {
      setLoading(true)
      await axios.delete(`v1/admin/sponser/${id}`);
      notifySucess('File deleted successfully');
      setLoading(false)
    }





    console.log(id);
  }
  const getRowId = (row) => row.name + row.phone_no;
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Box>
      <Toaster />
       {loading && <Loading loading={loading} />}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Sponsers
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard/sponser/create"
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
