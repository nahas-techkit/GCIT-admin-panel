import { Container } from '@mui/material';
import { useEffect, useReducer } from 'react';
import Table from '../../components/spekers/Table';
import { spekerReducer } from '../../Reducers/spekerReducer';
import axios from '../../utils/axios';
import Loading from '../../components/Loading/Loading';


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

      dispatch({ type: 'SPEKERS_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'SPEKERS_ERROR', payload: err.message });
    }
  };
console.log(spekers,"sss");
  useEffect(()=>{
    getAllSpeakers();
  },[])

  return (
    <Container>
      <Loading loading={loading}/>
      <Table row={spekers}/>
    </Container>
  );
}

export default Index;
