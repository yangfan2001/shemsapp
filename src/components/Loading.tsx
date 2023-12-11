import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

export default function Loading() {
  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh' // Full viewport height
      }}
    >
      <Box>
        <CircularProgress size={75} thickness={4.5} />
      </Box>
    </Container>
  );
}
