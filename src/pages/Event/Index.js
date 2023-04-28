import React, { useEffect, useReducer } from 'react';
import Table from '../../components/events/Event';
import axios from '../../utils/axios';
import { getEventsReducer } from '../../Reducers/eventReducers';
import Loading from '../../components/Loading/Loading';
import {Alert,notifyError,notifySucess} from '../../utils/alert'

function Index() {
  const [{ loading, error, events }, dispatch] = useReducer(getEventsReducer, {
    loading: false,
    events: [],
    error: '',
  });

  const deleteEvent = async (eventId)=>{
    Alert('Are you sure?', 'you want to Delete this').then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`v1/admin/event/${eventId}`);
        notifyError('Event deleted Successfully');
      } else {
        notifyError('Your action was cancelled');   
      }
    });
  }

  const getAllEvents = async () => {
    try {
      dispatch({
        type: 'EVENT_REQUEST',
      });

      const { data } = await axios.get('v1/admin/event');

      dispatch({
        type: 'EVENT_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <Loading loading={loading} />
      <Table events={events}  deleteEvent={deleteEvent} />
    </div>
  );
}

export default Index;
