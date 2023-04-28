
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Stack, Button, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { baseUrl } from '../../utils/BaseUrl';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import axios from '../../utils/axios';
import Loading from '../Loading/Loading';

export default function StandardImageList({ gallery, getAllImages }) {
  const [loading, setLoading] = useState(false)
  const [gallerys, setGallerys] = useState(gallery)

console.log(gallerys,'gallery');
  const deleteImage = async (id) => {
    const { isConfirmed } = await Alert('Are you sure?', 'you want to delete this');
    if (!isConfirmed) {
      notifyError('Your action was cancelled');
    } else {

      setLoading(true)
      await axios.delete(`v1/admin/gallery/${id}`);
      getAllImages()
      notifySucess('File deleted successfully');
      setLoading(false)
    }
  };

  return (
    <Box>
      <Toaster />
      <Loading loading={loading}/>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Images
        </Typography>
        <Button component={RouterLink} to="/dashboard/images/create" variant="contained">
          + Add Image
        </Button>
      </Stack>

      <ImageList sx={{ width: '100%', height: 450 }} cols={5} rowHeight={164} variant="quilted">
        {gallery.map((item, i) => (
          <ImageListItem key={i} sx={{ position: 'relative' }}>
            <img
              src={baseUrl + item.file}
              style={{ objectFit: 'cover' }}

              alt={item?.discription}
              loading="lazy"
            />
            <IconButton onClick={() => deleteImage(item?._id)} sx={{ position: 'absolute', top: 10, right: 10 }}>
              <DeleteIcon />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
