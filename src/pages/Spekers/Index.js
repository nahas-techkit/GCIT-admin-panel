import { Container } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { Toaster } from 'react-hot-toast';
import Table from '../../components/spekers/Table';
import { spekerReducer } from '../../Reducers/spekerReducer';
import axios from '../../utils/axios';
import Loading from '../../components/Loading/Loading';
import {Alert,notifySucess,notifyError} from '../../utils/alert'

function Index() {
  const [{ loading, error, spekers }, dispatch] = useReducer(spekerReducer, {
    loading: false,
    spekers: [],
    error: '',
  });

  const getAllSpeakers = async () => {
    try {
      dispatch({ type: 'SPEKERS_REQUEST' });

      const { data } = await axios.get('v1/admin/speker');
console.log(data,'spekers');
      dispatch({ type: 'SPEKERS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'SPEKERS_ERROR', payload: err.message });
    }
  };

  const deleteSpeker = async (id) => {
    try {
      const {isConfirmed} = await Alert('Are you sure?', 'you want to delete this')
      if(!isConfirmed){
       notifyError('Your action was cancelled')
       return;
      }
      dispatch({ type: 'SPEKERS_DELETE_REQUEST' });
      const { data } =await axios.delete(`v1/admin/speker/${id}`);
      dispatch({ type: 'SPEKERS_DELETE', payload: spekers.filter((speker) => speker._id !== id) });
      notifySucess(data.message);
    } catch (error) {
      dispatch({ type: 'SPEKERS_ERROR', payload: error.message });
      notifyError('Somthing went wrong');
    }
  };
  console.log(spekers, 'sss');
  useEffect(() => {
    getAllSpeakers();
  }, []);

  return (
    <Container>
      <Toaster />
      <Loading loading={loading} />
      <Table row={spekers} deleteSpeker={deleteSpeker} getAllSpeakers={getAllSpeakers} />
    </Container>
  );
}

export default Index;
