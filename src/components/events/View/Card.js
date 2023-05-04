import { Avatar, Box, Grid, Paper,Typography } from '@mui/material';
import React from 'react';
import {baseUrl} from '../../../utils/BaseUrl'

function Spekers({ person }) {
  return (
    <Grid container spacing={1}>
      {person.map((person,i) => (
        <Grid key={i} item>
          <Paper
            elevation={2}
            sx={{
              height: 100,
              width: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap:1,
              borderRadius: 2,
              mt: 3,
            }}
          >
            <Avatar alt={person?.name || person} src={baseUrl + person?.photo} />
            <Box>
              {' '}
              <Typography>{person?.name || person}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default Spekers;
