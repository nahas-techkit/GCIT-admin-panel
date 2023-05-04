import { useEffect, useState } from 'react';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Lable from '../Lable/StatusLable';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import axios from '../../utils/axios';
import Loading from '../Loading/Loading';

export default function DataTable({ row, deleteEvent,deleteLoading }) {

  const columns = [
    {
      field: 'eventTitle',
      headerName: 'Title',
      width: 300,
    },
    { field: 'startDateTime', headerName: 'Starting', width: 230 , valueGetter: (params) => {
      return moment(params.value).format('MMMM Do YYYY, h:mm a');
    },},
    { field: 'endDateTime', headerName: 'Ending', width: 230, valueGetter: (params) => {
      return moment(params.endDateTime).format('MMMM Do YYYY, h:mm a');
    } },

    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Lable value={params.value} />,
    },

    {
      headerName: 'Action',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>
          <Button color="success" onClick={() => navigate(`/dashboard/event/view/${row._id}`)}>
            <VisibilityIcon />
          </Button>
          <Button onClick={() => navigate(`/dashboard/event/edit/${row._id}`)}>
            <EditIcon />
          </Button>
          <Button color="error" onClick={() => deleteEvent(row._id)}>
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
  ];



  
  const navigate = useNavigate();
  const getRowId = (row) => row._id;
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Box>
      <Helmet>
        <title> GCIT | Event </title>
      </Helmet>
      <Toaster />
      <Loading loading={deleteLoading} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Button component={RouterLink} to="/dashboard/event/create" variant="contained">
          + New Event
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
