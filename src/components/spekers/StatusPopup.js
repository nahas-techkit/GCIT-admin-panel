import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function AlertDialog({ open, setOpen, currentStatus, handleStatusChange }) {
  const statusValues = ["Active", "Inactive"];
  const [statusValue, setStatusValue] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleStatusChange(statusValue);
    handleClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Update Your Status...'}</DialogTitle>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={currentStatus || 'Pending'}
            name="radio-buttons-group"
          >
            <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
              {statusValues.map((status) => (
                <FormControlLabel
                  key={status}
                  value={status}
                  control={<Radio />}
                  label={status}
                  onChange={(e) => setStatusValue(e.target.value)}
                />
              ))}
            </Box>
          </RadioGroup>
        </FormControl>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
