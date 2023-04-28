import { Box } from '@mui/material'
import React from 'react'

function StatusLable({value}) {
    const color = value === 'Active' ? '#41A936' : '#CF6673';
    const background = value === 'Active' ? '#DCF1D7' : '#FFE2E1';   
  return (
    <Box sx={{background , color, borderRadius:'5px', p:.5,px:1,display: 'inline-block',
    whiteSpace: 'nowrap', cursor:'pointer'}}>{value}</Box>
  )
}

export default StatusLable