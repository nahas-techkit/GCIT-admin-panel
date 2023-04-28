import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const Alert = (title, text) =>{

  return Swal.fire({
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
  });
};

export const notifySucess = ( message) => toast.success(message);
export const notifyError = ( message) => toast.error(message);
