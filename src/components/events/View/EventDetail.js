import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment/moment';
import StatusPopup from '../StatusCahange/StatusPopup';
import axios from '../../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../../utils/alert';
import Loading from '../../Loading/Loading';

function EventDetail({ event , getEvent}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onStatusChange = async () => {
    setOpen(true);
  };

  const handleStatusChange = async (value) => {
    console.log(value);
    setLoading(true);
    const { data } = await axios.patch(`v1/admin/event-status/${event._id}`, { status: value });
    getEvent()
    setLoading(false);
    notifySucess(data.message);
    setOpen(false);
  };

  const startDate = moment(event?.startDateTime).format('MMMM Do YYYY, h:mm a');
  const endtDate = moment(event?.endDateTime).format('MMMM Do YYYY, h:mm a');
  const color =
    event?.status === 'Pending'
      ? 'warning'
      : event?.status === 'Cancelled'
      ? 'error'
      : event?.status === 'Ongoing'
      ? 'primary'
      : event?.status === 'Completed'
      ? 'success'
      : 'info';

  return (
    <Paper sx={{ p: 3 }}>
      <StatusPopup
        open={open}
        setOpen={setOpen}
        handleStatusChange={handleStatusChange}
        currentStatus={event?.status}
      />
      <Loading loading={loading} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
        <Typography variant={'h4'} color={'primary'}>
          {event?.eventTitle}
        </Typography>

        <Chip label={event?.status} color={color || 'info'} onClick={() => onStatusChange()} />
      </Stack>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ p: 0 }}
        >
          <Typography variant="button" display="block">
            Event Details :
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Typography>
            Starting : <b>{startDate}</b>
          </Typography>
          <Typography>
            Ending : <b>{endtDate}</b>
          </Typography>

          <Typography>
            Venue : <b>{event?.venue}</b>
          </Typography>

          {event?.discription ? (
            <Box>
              <Typography variant="overline" color={'#81c784'}>
                Discription:
              </Typography>

              <Typography>{event?.discription}</Typography>
            </Box>
          ) : (
            <Typography>No Items</Typography>
          )}
          {/* { event.discription ? <Typography> '12323' </Typography> : <Typography>'No description'</Typography>} */}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default EventDetail;
