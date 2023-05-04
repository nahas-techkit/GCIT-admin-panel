import { Alert, notifySucess, notifyError } from '../utils/alert';

export const handleEventSubmit = async (values, resetForm, eventDispatch, addEvent, setDiscription) => {
  console.log(values);
  try {
    eventDispatch({
      type: 'EVENT_REQUEST',
    });
    Alert('Are you sure?', 'you want to add this').then(async (result) => {
      if (result.isConfirmed) {
        await addEvent(values);
        resetForm();
        notifySucess('Your entry was saved');
      } else {
        notifyError('Your action was cancelled');
        resetForm();
      }
    });

    eventDispatch({
      type: 'EVENT_SUCCESS',
    });

    setDiscription([]);
  } catch (error) {
    eventDispatch({
      type: 'EVENT_ERROR',
      payload: error.response.data.message,
    });
  }
};
