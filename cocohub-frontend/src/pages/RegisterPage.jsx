import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { 
  Container, Box, Typography, TextField, Button, 
  CircularProgress, Alert, Paper, Link, Select, 
  MenuItem, FormControl, InputLabel 
} from '@mui/material';


function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    userType: 'Farmer',
    phoneNumber: '',
    province: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.post('http://localhost:8080/api/auth/register', formData)
      .then(() => {
        setLoading(false);
        alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
        navigate('/login');
      })
      .catch(error => {
        setLoading(false);
        setError(error.response?.data || "An error occurred during registration.");
      });
  };

  return (
    <Container component="main" maxWidth="xs"> 
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register (FR-12)
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="province"
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="userType-label">Register as</InputLabel>
            <Select
              labelId="userType-label"
              id="userType"
              name="userType"
              value={formData.userType}
              label="Register as"
              onChange={handleChange}
            >
              <MenuItem value="Farmer">Farmer (เกษตรกร)</MenuItem>
              <MenuItem value="Entrepreneur">Entrepreneur (ผู้ประกอบการ)</MenuItem>
            </Select>
          </FormControl>

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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Link component={RouterLink} to="/login" variant="body2">
            {"Already have an account? Login"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;