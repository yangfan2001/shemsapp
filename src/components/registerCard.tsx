import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Snackbar,Alert } from '@mui/material';
import { register } from '../services/customer';

const RegisterCard: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rePassword, setRePassword] = useState(''); // [1
  const [password, setPassword] = useState('');
  const [billingStreetNum, setBillingStreetNum] = useState('');
  const [billingStreetName, setBillingStreetName] = useState('');
  const [billingUnitNumber, setBillingUnitNumber] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZipcode, setBillingZipcode] = useState('');
  const [errorInfo, setErrorInfo] = useState(''); 
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failSnackbar, setFailSnackbar] = useState(false);

  const handleRegister = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // check if password and rePassword are the same
    if (password !== rePassword) {
      setErrorInfo('Password does not match');
      setFailSnackbar(true);
      return;
    }
    // check if Steet Number is a number
    if (isNaN(Number(billingStreetNum))) {
      setErrorInfo('Street Number must be a number');
      setFailSnackbar(true);
      return;
    }
    // check if Zipcode is a number and has 5 digits
    if (isNaN(Number(billingZipcode)) || billingZipcode.length !== 5) {
      setErrorInfo('Zipcode must be a 5-digit number');
      setFailSnackbar(true);
      return;
    }
    // register login
    const registerInfo = {
      firstName,
      lastName,
      email,
      password,
      billingStreetNum: Number(billingStreetNum) || 0, // Set a default value of 0 if billingStreetNum is undefined
      billingStreetName,
      billingUnitNumber,
      billingCity,
      billingState,
      billingZipcode
    };
    await register(registerInfo).then((res) => {
      if (res.status === 201) {
        setSuccessSnackbar(true);
        window.location.href = '/login';
      }
    }).catch((err) => {
      setErrorInfo(err.response.data.message);
      setFailSnackbar(true);
    });
  };

  return (
    <Card sx={{ maxWidth: 600, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontFamily: 'Arial', fontWeight: 'bold', mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Enter Your Password Again" type="password" variant="outlined" fullWidth value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField label="Billing Street Number" variant="outlined" fullWidth value={billingStreetNum} onChange={(e) => setBillingStreetNum(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Billing Street Name" variant="outlined" fullWidth value={billingStreetName} onChange={(e) => setBillingStreetName(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Billing Unit Number" variant="outlined" fullWidth value={billingUnitNumber} onChange={(e) => setBillingUnitNumber(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Billing City" variant="outlined" fullWidth value={billingCity} onChange={(e) => setBillingCity(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Billing State" variant="outlined" fullWidth value={billingState} onChange={(e) => setBillingState(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Billing Zipcode" variant="outlined" fullWidth value={billingZipcode} onChange={(e) => setBillingZipcode(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </CardContent>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={successSnackbar} autoHideDuration={1000} onClose={() => { setSuccessSnackbar(false) }}>
        <Alert onClose={() => { setSuccessSnackbar(false) }} severity="success" sx={{ width: '100%' }}>
          Register Success!
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={failSnackbar} autoHideDuration={5000} onClose={() => { setFailSnackbar(false) }}>
        <Alert onClose={() => { setFailSnackbar(false) }} severity="error" sx={{ width: '100%' }}>
          {errorInfo}
        </Alert>
      </Snackbar>

    </Card>
  );
};

export default RegisterCard;
