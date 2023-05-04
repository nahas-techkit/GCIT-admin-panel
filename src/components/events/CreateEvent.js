import { Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Formik, Form as Forms, useFormik } from 'formik';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import { spekerReducer, createEventReducer } from '../../Reducers/eventReducers';
import Loading from '../Loading/Loading';
import { handleEventSubmit } from '../../functions/event';

function Form() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const edit = !!id;


  const [initialValue, setIntialValue] = useState({
    eventTitle: '',
    startDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    endDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    venue: '',
    discription: '',
  });

  // Setup Intial Value For Edit
  const eventDetail = async () => {
    if (!edit) {
      return;
    }
    const { data } = await axios.get(`v1/admin/event/${id}`);
    setIntialValue({
      eventTitle: data?.event?.eventTitle,
      startDateTime: moment(data?.event?.startDateTime).format('YYYY-MM-DDTHH:mm'),
      endDateTime: moment(data?.event?.endDateTime).format('YYYY-MM-DDTHH:mm'),
      venue: data?.event?.venue,
      discription: data?.event?.discription,
    });
  };

  // Create New Event
  const addEvent = async (values, resetForm) => {
    const { isConfirmed } = await Alert('Are you sure?', 'you want to add this');
    if (isConfirmed) {
      setLoading(true);
      const { data } = await axios.post('v1/admin/event', values);
      notifySucess(data.message);
      resetForm();
      setLoading(false);
    } else {
      resetForm();
      notifyError('Your action was cancelled');
    }
  };

  // Edit event
  const editEvent = async (values, resetForm) => {
    const { isConfirmed } = await Alert('Are you sure?', 'you want to add this');
    if (isConfirmed) {
      setLoading(true);
      const { data } = await axios.post('v1/admin/event', values);
      notifySucess(data.message);
      resetForm();
      setLoading(false);
    } else {
      resetForm();
      notifyError('Your action was cancelled');
    }
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit,  isSubmitting } = useFormik({
    initialValues: initialValue,
    validationSchema: checkoutSchema,
    enableReinitialize: edit,
    onSubmit: async (values, { resetForm }) => {
      if (edit) {
        editEvent(values, resetForm);
      } else {
        addEvent(values, resetForm);
      }
    },
  });

  useEffect(() => {
    eventDetail();
  }, []);

  return (
    <Container>
      <Loading loading={loading} />
      <Toaster />
      <Typography variant="h4" gutterBottom>
        {edit ? 'Edit Event' : 'Create New Event'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.eventTitle}
              name="eventTitle"
              error={!!touched.eventTitle && !!errors.eventTitle}
              helperText={touched.eventTitle && errors.eventTitle}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Starting Date and Time
            </InputLabel>
            <TextField
              fullWidth
              type="datetime-local"
              // my-date-format="DD/MM/YYYY, hh:mm:ss"
              id="meeting-time"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.startDateTime}
              name="startDateTime"
              error={!!touched.startDateTime && !!errors.startDateTime}
              helperText={touched.startDateTime && errors.startDateTime}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Ending Date and Time
            </InputLabel>
            <TextField
              fullWidth
              type="datetime-local"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.endDateTime}
              name="endDateTime"
              error={!!touched.endDateTime && !!errors.endDateTime}
              helperText={touched.endDateTime && errors.endDateTime}
            />
          </Grid>

          <Grid item sm={12} md={12} xs={12}>
            <TextField
              fullWidth
              label="Venue"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.venue}
              name="venue"
              error={!!touched.venue && !!errors.venue}
              helperText={touched.venue && errors.venue}
            />
          </Grid>

          <Grid item sm={12} md={12} xs={12}>
            <TextField
              fullWidth
              multiline
              label="Discription"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.discription}
              name="discription"
              error={!!touched.discription && !!errors.discription}
              helperText={touched.discription && errors.discription}
            />
          </Grid>
        </Grid>
        <Stack mt={3} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

const checkoutSchema = yup.object().shape({
  eventTitle: yup.string().required('Title is required'),
  startDateTime: yup.date().required('Starting Date is required'),
  endDateTime: yup.date().required('Ending Date required'),
  venue: yup.string().required('Vanue is required'),
});

export default Form;
