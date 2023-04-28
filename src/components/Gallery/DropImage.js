import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../utils/axios';
import { Alert, notifySucess, notifyError } from '../../utils/alert';

function DropImage() {
  const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const [discription, setDiscription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [images, setImages] = useState([]);

  // On Drop Functions
  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      return acceptedFileTypes.includes(file.type);
    });

    if (validFiles.length === 0) {
      setError('Invalid File, please select a valid file (jpeg / png)');
      setDisable(true);
    } else {
      setError('');
      setDisable(false);
      setImages(validFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, removeFile } = useDropzone({ onDrop });

  const handleRemoveFile = (file) => {
    setImages(images.filter((f) => f !== file));
    removeFile(file);
  };

  // Submit the file
  const submitImage = async () => {
    if (images.length === 0) setError('No files you selected');
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('images', image);
        });

        await axios.post('v1/admin/gallery', formData);
        notifySucess('Your entry was saved');
        setLoading(false);
        setImages([]);
      } else {
        notifyError('Your action was cancelled');
        setImages([]);
      }
    });
  };
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Toaster />
      <Typography color={'error'}>{error}</Typography>
      <Box
        sx={{
          background: '#EFF0EB',
          height: 200,
          width: '100%',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag drop some files here, or click to select files</p>}
      </Box>

      {/* <TextField
        fullWidth
        multiline
        label="Discription"
        variant="outlined"
        onChange={(e) => setDiscription(e.target.value)}
      /> */}

      <Grid container spacing={2}>
        {images?.map((item, i) => (
          <Grid key={i} item sm={4} md={3} xs={6}>
            <Box w={'100%'} sx={{ position: 'relative' }}>
              <IconButton onClick={() => handleRemoveFile(item)} sx={{ position: 'absolute', top: 10, right: 10 }}>
                <CloseIcon />
              </IconButton>
              <img width={'100%'} src={URL.createObjectURL(item)} alt={images[0].name} loading="lazy" />
            </Box>
          </Grid>
        ))}
      </Grid>

      <LoadingButton
        loading={loading}
        disabled={disable}
        onClick={submitImage}
        variant="contained"
        color="success"
        fullWidth
      >
        Submit
      </LoadingButton>
    </Stack>
  );
}

export default DropImage;
