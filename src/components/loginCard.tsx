import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const LoginCard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(username, password);
  };

  return (
    <Card sx={{ 
        maxWidth: 345,
        boxShadow: 3, 
        borderRadius: 2, 
        bgcolor: 'background.paper', 
    }}>
      <CardContent>
        <Typography variant="h5" component="div" 
        sx={{textAlign:'center', fontFamily: 'Arial',
            fontWeight: 'bold'}}>
          Log In
        </Typography>
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password"
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoginCard;