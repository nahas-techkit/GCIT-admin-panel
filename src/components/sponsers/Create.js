import { Container, Grid, CardMedia, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik, form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import { spekerReducer } from '../../Reducers/eventReducers';
import Loading from '../Loading/Loading';
import { baseUrl } from '../../utils/BaseUrl';

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
  const [sponsor, setSponser] = useState({});
  const [initialValue, setIntialValue] = useState({
    name: '',
    email: '',
    company_bio: '',
    sponserImg: '',
  });

  const { id } = useParams();

  const edit = !!id;

  const sponserDetails = async () => {
    if (edit) {
      const { data } = await axios.get(`v1/admin/sponsor/${id}`);

      setIntialValue({
        name: data?.name,
        email: data?.email,
        company_bio: data?.bio,
        sponserImg: null,
      });
      setSponser(data);
    }
  };

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

  const handleSponsorSubmit = async (values, resetForm) => {
    console.log(values);
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          spekerDispatch({ type: 'SPEKERS_REQUEST' });

          if (!edit) {
            console.log('!edit');
            const { data } = await axios.post('v1/admin/sponsor', formData);
            spekerDispatch({ type: 'SPEKERS_SUCCESS', payload: data });
          } else{
            const { data } = await axios.put(`v1/admin/sponsor/${id}`, formData);
            spekerDispatch({ type: 'SPEKERS_SUCCESS'});
          }
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

    console.log(values, 'value');
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: initialValue,
    validationSchema: checkoutSchema,
    enableReinitialize: edit,
    onSubmit: async (values, { resetForm }) => {
      
      handleSponsorSubmit(values, resetForm);
    },
  });

  useEffect(() => {
    sponserDetails();
  }, []);

  return (
    <Container>
      { <Loading loading={loading} />}
      <Toaster />
      <Typography variant="h4" gutterBottom>
        Create New Sponser
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
              multiline
              label="Company Bio"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.company_bio}
              name="company_bio"
              error={!!touched.company_bio && !!errors.company_bio}
              helperText={touched.company_bio && errors.company_bio}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              sx={{ width: '100%' }}
              type="file"
              onBlur={handleBlur}
              onChange={(event) => {
                handleImageChange(event);
                setFieldValue('sponserImg', event.target.files[0]);
              }}
              name="sponserImg"
              error={!!touched.sponserImg && !!errors.sponserImg}
              helperText={touched.sponserImg && errors.sponserImg}
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

        {edit && !image && (
          <CardMedia
            sx={{ background: '#D0D3D8', p: 0.5, borderRadius: '5px', maxWidth: '150px' }}
            component="img"
            alt="Preview"
            image={baseUrl + sponsor.photo}
            className={classes.preview}
          />
        )}
        <Stack
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
  email: yup.string().required('Phone No is required'),
  sponserImg: yup
    .mixed()
    .nullable(true)
    .test('fileFormat', 'Only jpeg or jpg files are allowed', (value) => {
      if (value) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return true;
    }),
});

export default Form;
