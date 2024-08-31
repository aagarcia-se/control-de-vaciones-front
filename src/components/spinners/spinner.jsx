// src/components/spinner/Spinner.js

import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Spinner = ({ size = 60, color = 'secondary', thickness = 5, backgroundColor = '#ffffff' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: backgroundColor, // Color de fondo del spinner
        position: 'relative',
      }}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round', // Esquinas redondeadas del spinner
          },
        }}
      />
    </Box>
  );
};

export default Spinner;
