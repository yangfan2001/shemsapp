import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { login } from "../services/customer";
import { Snackbar, Alert } from "@mui/material";

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failSnackbar, setFailSnackbar] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // check if email and password are empty
    if (!email || !password) {
      setError(true);
      return;
    }
    await login(email, password)
      .then((res) => {
        if (res.status === 200) {
          const { success, message, token } = res.data;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("email", email);
          setSuccessSnackbar(true);
          window.location.href = "/account";
        }
      })
      .catch((err) => {
        setFailSnackbar(true);
      });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", fontFamily: "Arial", fontWeight: "bold" }}
        >
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </Box>
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={successSnackbar}
        autoHideDuration={1000}
        onClose={() => {
          setSuccessSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setSuccessSnackbar(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login Success!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={failSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          setFailSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setFailSnackbar(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid email or password!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default LoginCard;
