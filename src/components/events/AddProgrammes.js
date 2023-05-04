import { Autocomplete, Button, Container, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form as Forms, useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import { spekerReducer, createEventReducer } from '../../Reducers/eventReducers';
import Loading from '../Loading/Loading';
import { handleEventSubmit } from '../../functions/event';

function Form() {
  const [editLoading, setEditLoading]=useState(false)
  const { schId } = useParams();
  const { eventId } = useParams();
  const edit = !!schId;

  const [discription, setDiscription] = useState([]);
  const [initialValue, setIntialValue] = useState({
    title: '',
    startDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    endDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    speakers: [],
    moderator: [],
    discription,
  });

  const scheduleDetail = async () => {
    if (!edit) return;

    const { data } = await axios.get(`v1/admin/schedule/${schId}`);
    console.log(data, 'data');
    setIntialValue({
      title: data?.title,
      startDateTime: moment(data?.startDateTime).format('YYYY-MM-DDTHH:mm'),
      endDateTime: moment(data?.endDateTime).format('YYYY-MM-DDTHH:mm'),
      speakers: data?.speakers,
      moderator: data?.moderator,
      discription: data?.discription,
    });

    setDiscription((pre) => [...pre, data.discription]);
  };

  const handleAddDiscription = (event, newValue) => {
    setDiscription(newValue || []);
  };

  const editEventHandler = async (values, resetForm) => {

    console.log(values,'values');
    const value = {
      ...values,
      discription,
      eventId,
    };
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        setEditLoading(true)
        await axios.put(`v1/admin/schedule/${schId}`, value);
        scheduleDetail()
        resetForm();
        setEditLoading(false);
        notifySucess('Your entry was saved');
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });
  };

  const addEvent = async (values) => {
    const value = {
      ...values,
      discription,
    };
    await axios.post(`v1/admin/schedule/${eventId}`, value);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValue,
    validationSchema: checkoutSchema,
    enableReinitialize: edit,
    onSubmit: async (values, { resetForm }) => {
      if (edit) {
        editEventHandler(values, resetForm);
      } else {
        handleEventSubmit(values, resetForm, eventDispatch, addEvent, setDiscription);
      }
    },
  });
  const [{ loading, spekers }, spekerDispatch] = useReducer(spekerReducer, {
    loading: false,
    spekers: [],
    error: '',
  });

  const [{ evtLoading }, eventDispatch] = useReducer(spekerReducer, {
    evtLoading: false,
    event: {},
    errors: '',
  });

  const getAllspekers = async () => {
    try {
      spekerDispatch({
        type: 'SPEKERS_REQUEST',
      });
      const { data } = await axios.get('v1/admin/speker');

      spekerDispatch({
        type: 'SPEKERS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      spekerDispatch({
        type: 'SPEKERS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getAllspekers();
    scheduleDetail();
  }, []);
  return (
    <Container>
      <Loading loading={loading || evtLoading || editLoading} />
      <Toaster />
      <Typography variant="h4" gutterBottom>
        {edit ? 'Edit Schedule' : 'Add Schedule'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Starting Date and Time
            </InputLabel>
            <TextField
              fullWidth
              type="datetime-local"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.startDateTime}
              name="startDateTime"
              error={!!touched.startDateTime && !!errors.startDateTime}
              helperText={touched.startDateTime && errors.startDateTime}
            />
          </Grid>

          <Grid item md={6} sm={12}>
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

          <Grid item md={12} sm={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={spekers}
              getOptionLabel={(spekers) => spekers?.name}
              filterSelectedOptions
              value={values.speakers || null}
              onChange={(event, value) => {
                setFieldValue('speakers', value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Spekers"
                  placeholder="Spekers"
                  onChange={handleChange}
                  value={values.speakers}
                  name="spekers"
                  error={!!touched.spekers && !!errors.spekers}
                  helperText={touched.spekers && errors.spekers}
                />
              )}
            />
          </Grid>

          <Grid item md={12} sm={12}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={spekers}
              getOptionLabel={(spekers) => spekers?.name}
              filterSelectedOptions
              value={values.moderator || null}
              onChange={(event, value) => {
                setFieldValue('moderator', value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Moderator"
                  placeholder="Moderator"
                  onChange={handleChange}
                  value={values.moderator}
                  name="spekers"
                  error={!!touched.spekers && !!errors.spekers}
                  helperText={touched.spekers && errors.spekers}
                />
              )}
            />
          </Grid>

          <Grid item md={12} sm={12}>
            <Autocomplete
              multiple
              freeSolo
              options={discription}
              onChange={handleAddDiscription}
              value={discription || null}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  multiline
                  label="Discription"
                  onBlur={handleBlur}
                  value={discription}
                  name="discription"
                  error={!!touched.discription && !!errors.discription}
                  helperText={touched.discription && errors.discription}
                />
              )}
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
  title: yup.string().required('Title is required'),
  startDateTime: yup.date().required('Starting Date is required'),
  endDateTime: yup.date().required('Ending Date required'),
});

export default Form;
