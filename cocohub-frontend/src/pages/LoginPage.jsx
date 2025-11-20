import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  Container, Box, Typography, TextField, Button,
  CircularProgress, Alert, Paper, Link
} from '@mui/material';


function LoginPage() {
  const { loginAction } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.post('http://localhost:8080/api/auth/login', { email, password })
      .then(response => {
        setLoading(false);
        const { jwtToken, email: userEmail, userType } = response.data;
        loginAction(jwtToken, userEmail, userType);

        if (userType === 'Admin') {
          navigate('/dashboard/admin');
        } else if (userType === 'Entrepreneur') {
          navigate('/dashboard/entrepreneur');
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        } else {
          setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5"> Login </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Link component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;