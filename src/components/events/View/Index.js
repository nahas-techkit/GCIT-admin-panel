import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { getEventByIdReducer } from '../../../Reducers/eventReducers';

import axios from '../../../utils/axios';
import Loading from '../../Loading/Loading';
import EventDetail from './EventDetail';
import EventSchedule from './Schedule';

function ViewEvent() {
  const { id } = useParams();
  const [{ loading, error, event }, dispatch] = useReducer(getEventByIdReducer, {
    loading: false,
    event: {},
    error: '',
  });

  const getEvent = async () => {
    try {
      dispatch({
        type: 'EVENT_REQUEST',
      });

      const { data } = await axios.get(`v1/admin/event/${id}`);

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
    getEvent();
  }, []);

  return (
    <Container>
      <Loading loading={loading} />
      <EventDetail event={event?.event} getEvent={getEvent} />
      <EventSchedule eventSchedule={event?.event?.event_schedule} id={event?.event?._id} getEvent={getEvent}/>
    </Container>
  );
}

export default ViewEvent;
