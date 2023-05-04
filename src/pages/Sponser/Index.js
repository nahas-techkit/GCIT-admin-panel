import { Container } from '@mui/material';
import { useEffect, useReducer } from 'react';
import {sponserReducer} from '../../Reducers/sponserReducers'
import Sponser from '../../components/sponsers/Table';
import axios  from '../../utils/axios';
import Loading from '../../components/Loading/Loading';

function Index() {
  const [{ loading, error, sponser }, dispatch] = useReducer(sponserReducer, {
    loading: false,
    sponser: [],
    error: '',
  });

  const getAllSponsers = async () => {
    try {
      dispatch({ type: 'SPONSER_REQUEST' });

      const { data } = await axios.get('v1/admin/sponser');
      console.log(data);

      dispatch({ type: 'SPONSER_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'SPONSER_ERROR', payload: err.message });
    }
  };


  useEffect(() => {
    getAllSponsers();
  }, []);

  return (
    <Container>
        {loading && <Loading loading={loading} />}
      <Sponser  row={sponser} getAllSponsers={getAllSponsers}/>
    </Container>
  );
}

export default Index;
