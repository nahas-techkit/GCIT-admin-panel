import { useState } from 'react';
import { Box, Button, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment';
import Spekers from './Card';
import Loading from '../../Loading/Loading';
import axios from '../../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../../utils/alert';
import StatusPopup from '../StatusCahange/StatusPopup';

function Schedule({ eventSchedule, id, getEvent }) {
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Edit Schedule
  const editEvent = (schId) => {
    navigate(`/dashboard/event/schedule/edit/${id}/${schId}`);
  };

  // Change Schedule Status
  const onStatusChange = (value) => {
    setCurrentItem(value);
    setOpen(true);
  };

  const handleStatusChange = async (value) => {
    console.log(value);
    setLoading(true);
    const { data } = await axios.patch(`v1/admin/schedule-status/${currentItem._id}`, { status: value });
    getEvent()
    setLoading(false);
    notifySucess(data.message);
    setOpen(false);
  };

  // Delete Schedule
  const deleteSchedule = async (schId) => {
    Alert('Are you sure?', 'You Want To Delete This').then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const { data } = await axios.delete(`v1/admin/schedule/${schId}`);
        setLoading(false);
        notifySucess(data.message);
      } else {
        notifyError('Your action was cancelled');
      }
    });
  };

  return (
    <Box mt={5}>
      <Toaster />
      <Loading loading={loading} />
      <StatusPopup
        open={open}
        setOpen={setOpen}
        handleStatusChange={handleStatusChange}
        currentStatus={currentItem.status}
      />
      <Helmet>
        <title> GCIT | Event </title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" gutterBottom>
          Programme schedule
        </Typography>
        <Button component={RouterLink} to={`/dashboard/event/schedule/${id}`} variant="contained">
          + Add schedule
        </Button>
      </Stack>

      {eventSchedule?.map((item, i) => {
        const startDate = moment(item?.startDateTime).format('MMMM Do YYYY, h:mm a');
        const endtDate = moment(item?.endDateTime).format('MMMM Do YYYY, h:mm a');
        const color =
          item?.status === 'Pending'
            ? 'warning'
            : item?.status === 'Cancelled'
            ? 'error'
            : item?.status === 'Ongoing'
            ? 'info'
            : item?.status === 'Completed'
            ? 'success'
            : 'info';
        return (
          <Paper key={i} sx={{ p: 3, mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant={'h6'}>{item.title}</Typography>

                <Chip label={item?.status || 'Pending'} color={color || 'info'} onClick={() => onStatusChange(item)} />
              </Stack>
              <Box>
                <IconButton onClick={() => editEvent(item._id)} color="primary" aria-label="Delete">
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => deleteSchedule(item._id)} color="error" aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>

            <Typography>
              Starting : <b>{startDate}</b>
            </Typography>
            <Typography>
              Ending : <b>{endtDate}</b>
            </Typography>

            <Typography>
              Duration : <b>{item?.duration}</b>
            </Typography>

            <Typography color={'#4caf50'} mt={2}>
              <b>Spekers</b>
            </Typography>
            <Spekers person={item?.speakers} />

            <Typography color={'#4caf50'} mt={2}>
              <b>Moderator</b>
            </Typography>
            <Spekers person={item?.moderator} />
            <Typography color={'#4caf50'} mt={2}>
              <b>Discription</b>
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {item?.discription?.map((des, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleOutlineIcon /> <Typography> {des} </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

Schedule.propTypes = {
  eventSchedule: PropTypes.array,
  id: PropTypes.string,
};
export default Schedule;
