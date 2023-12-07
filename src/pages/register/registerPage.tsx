import React from 'react';
import Box from '@mui/material/Box';
import RegisterCard from '../../components/registerCard';

export default function RegisterPage() {
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <RegisterCard/>
        </Box>
    )
}