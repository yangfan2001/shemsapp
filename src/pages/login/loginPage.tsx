import React from 'react';
import LoginCard from "../../components/loginCard";
import Box from '@mui/material/Box';

export default function LoginPage() {
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' // 视口高度
          }}>
            <LoginCard/>
        </Box>
    )
}