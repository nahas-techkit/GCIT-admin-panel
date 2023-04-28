import { Container, Grid, CardMedia, Stack, TextField, Typography } from '@mui/material';
import { useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import { spekerReducer} from '../../Reducers/eventReducers';
import Loading from '../Loading/Loading';


const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  preview: {
    maxWidth: 200,
    maxHeight: 200,
    marginTop: 10,
  },
});



function Form() {

  const [{ loading, spekers }, spekerDispatch] = useReducer(spekerReducer, {
    loading: false,
    spekers: {},
    error: '',
  });

  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSpekerSubmit = async (values, resetForm) => {
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          spekerDispatch({ type: 'SPEKERS_REQUEST' });
          const { data } = await axios.post('v1/admin/speker', formData);
          spekerDispatch({ type: 'SPEKERS_SUCCESS', payload: data });
        } catch (err) {
          spekerDispatch({ type: 'SPEKERS_ERROR', payload: err.message });
        }
        resetForm();
        notifySucess('Your entry was saved');
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });

    console.log(values);
  };

  const { id } = useParams();
  const edit = !!id;

  const [initialValue, setIntialValue] = useState({
    name: '',
    phone_no: '',
    email: '',
    personal_bio: '',
    company: '',
    education: '',
    permenent_address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    photo: '',
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValue,
    validationSchema: checkoutSchema,
    onSubmit: async (values, { resetForm }) => {
      handleSpekerSubmit(values, resetForm);
    },
  });

  return (
    <Container>
      {loading && <Loading />}
      <Toaster />
      <Typography variant="h4" gutterBottom>
        Create New Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone_no}
              name="phone_no"
              error={!!touched.phone_no && !!errors.phone_no}
              helperText={touched.phone_no && errors.phone_no}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Education"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.education}
              name="education"
              error={!!touched.education && !!errors.education}
              helperText={touched.education && errors.education}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              multiline
              label="Personal Bio"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.personal_bio}
              name="personal_bio"
              error={!!touched.personal_bio && !!errors.personal_bio}
              helperText={touched.personal_bio && errors.personal_bio}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              multiline
              label="Permenent Address"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.permenent_address}
              name="permenent_address"
              error={!!touched.permenent_address && !!errors.permenent_address}
              helperText={touched.permenent_address && errors.permenent_address}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              error={!!touched.city && !!errors.city}
              helperText={touched.city && errors.city}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.state}
              name="state"
              error={!!touched.state && !!errors.state}
              helperText={touched.state && errors.state}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.country}
              name="country"
              error={!!touched.country && !!errors.country}
              helperText={touched.country && errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              sx={{ width: '100%' }}
              type="file"
              onBlur={handleBlur}
              onChange={(event) => {
                handleImageChange(event);
                setFieldValue('photo', event.target.files[0]);
              }}
              name="photo"
              error={!!touched.photo && !!errors.photo}
              helperText={touched.photo && errors.photo}
            />
          </Grid>
        </Grid>
        {image && (
          <CardMedia
            sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px' }}
            component="img"
            alt="Preview"
            image={image}
            className={classes.preview}
          />
        )}
        <Stack
          sx={{ position: 'sticky', bottom: 100, right: 50 }}
          mt={3}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone_no: yup.string().required('Phone No is required'),
  email: yup.string().required('Phone No is required'),
  city: yup.string().required('City No is required'),
  state: yup.string().required('State No is required'),
  country: yup.string().required('Country No is required'),
  photo: yup
    .mixed()
    .required('Please upload a file')
    .test('fileFormat', 'Only jpeg or jpg files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg'].includes(value.type);
      }
      return true;
    }),
});

export default Form;
