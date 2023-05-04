import React, { useEffect, useReducer, useState } from 'react';
import Table from '../../components/events/EventList';
import axios from '../../utils/axios';
import { getEventsReducer } from '../../Reducers/eventReducers';
import Loading from '../../components/Loading/Loading';
import {Alert,notifyError,notifySucess} from '../../utils/alert'

function Index() {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [{ loading, events }, dispatch] = useReducer(getEventsReducer, {
    loading: false,
    events: [],
    error: '',
  });

  

  const getAllEvents = async () => {
    try {
      dispatch({
        type: 'EVENT_REQUEST',
      });

      const { data } = await axios.get('v1/admin/event');
      dispatch({
        type: 'EVENT_SUCCESS',
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: 'EVENT_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  const deleteEvent = async (id) => {
    const { isConfirmed } = await Alert('Are you sure?', 'you want to delete this');
    if (isConfirmed) {
      setDeleteLoading(true);
      const { data } = await axios.delete(`v1/admin/event/${id}`);
     
      dispatch({
        type: 'EVENT_DELETE',
        payload: events.filter((event)=> event._id !== id)
      });
      notifySucess(data.message);

      setDeleteLoading(false);
    } else {
      notifyError('Your action was cancelled');
    }
  };
  

  useEffect(() => {
    getAllEvents();
  }, []);


  return (
    <div>
      <Loading loading={loading} />
      <Table row={events} deleteEvent={deleteEvent} deleteLoading={deleteLoading} />
    </div>
  );
}

export default Index;
