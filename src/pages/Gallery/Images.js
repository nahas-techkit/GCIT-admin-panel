import { useEffect, useReducer } from 'react';
import { Container } from '@mui/material';
import ImageGallery from '../../components/Gallery/ImageGallery';
import {galleryReducer} from '../../Reducers/galleryReducer'
import Loading from '../../components/Loading/Loading';
import axios from '../../utils/axios';


function Image() {
    const [{ loading, error, gallery }, dispatch] = useReducer(galleryReducer, {
        loading: false,
        gallery: [],
        error: '',
      });

    const getAllImages = async () => {
        try {
          dispatch({
            type: 'GALLERY_REQUEST',
          });
    
          const { data } = await axios.get('v1/admin/image');
    
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
        getAllImages()
      },[])

  return (
   <Container>
    <Loading loading={loading} />
    <ImageGallery gallery={gallery} getAllImages={getAllImages}/>
   </Container>
  )
}

export default Image;