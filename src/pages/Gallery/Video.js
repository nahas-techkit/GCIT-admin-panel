import { Button, Container, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import VideoGallery from '../../components/Gallery/VideoGallery'
import {galleryReducer} from '../../Reducers/galleryReducer'
import Loading from '../../components/Loading/Loading';
import axios from '../../utils/axios';

function Video() {

    const [{ loading, error, gallery }, dispatch] = useReducer(galleryReducer, {
        loading: false,
        gallery: [],
        error: '',
      });

    const getAllVideos = async () => {
        try {
          dispatch({
            type: 'GALLERY_REQUEST',
          });
    
          const { data } = await axios.get('v1/admin/video');
    
          dispatch({
            type: 'GALLERY_SUCCESS',
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: 'GALLERY_ERROR',
            payload: error.response.data.message,
          });
        }
      };

      useEffect(()=>{
        getAllVideos()
      },[])




  return (
    <Container>
        <Loading loading={loading} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Videos
        </Typography>
        <Button component={RouterLink} to="/dashboard/video/create" variant="contained">
          + Add Video
        </Button>
      </Stack>
        <VideoGallery gallery={gallery} getAllVideos={getAllVideos}/>
    </Container>
  )
}

export default Video