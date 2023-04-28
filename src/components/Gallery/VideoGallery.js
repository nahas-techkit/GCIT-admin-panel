import * as React from 'react';
import { Grid, Card, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toaster } from 'react-hot-toast';
import { baseUrl } from '../../utils/BaseUrl';
import { Alert, notifySucess, notifyError } from '../../utils/alert';
import axios from '../../utils/axios';
import Loading from '../Loading/Loading';

export default function VideoGallery({ gallery, getAllVideos }) {
  const [loading, setLoading] = React.useState(false);

  const deleteVideo = async (id) => {
    const { isConfirmed } = await Alert('Are you sure?', 'you want to delete this');
    if (!isConfirmed) {
      notifyError('Your action was cancelled');
    } else {
      setLoading(true);
      await axios.delete(`v1/admin/gallery/${id}`);
      getAllVideos();
      notifySucess('File deleted successfully');
      setLoading(false);
    }
  };
  return (
    <Grid container spacing={2}>
      <Toaster />
      {gallery.map((video, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} sx={{ position: 'relative' }}>
          <Card>
            <CardMedia component="iframe" title={video.file} src={baseUrl + video.file} height={200} />
          </Card>
          <IconButton onClick={() => deleteVideo(video?._id)} sx={{ position: 'absolute', top: 20, right: 10 }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
}
