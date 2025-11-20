/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus, deleteUser } from '../services/api';

import {
  Container, Box, Typography, Button, Paper, Link,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, IconButton, Alert, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    getAllUsers()
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setError("Could not load users. (Are you an Admin?)");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    updateUserStatus(userId, newStatus)
      .then(() => {

        alert(`User status updated to ${newStatus}`);
        fetchUsers();
      })
      .catch(err => alert("Error updating status: " + (err.response?.data || err.message)));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      deleteUser(userId)
        .then(() => {

          alert('User deleted successfully.');
          fetchUsers();
        })
        .catch(err => alert("Error deleting user: " + (err.response?.data || err.message)));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'Active': return "success";
      case 'Suspended': return "warning";
      case 'Pending': return "default";
      default: return "default";
    }
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case 'Admin': return "error";
      case 'Entrepreneur': return "primary";
      case 'Farmer': return "info";
      default: return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Dashboard (FR-13)
      </Typography>
      <Typography variant="body1" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f4f4f4' }}>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell>User Type (Role)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions (FR-13)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.userId}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>
               
                  <Chip 
                    label={user.userType} 
                    color={getRoleChipColor(user.userType)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
              
                  <Chip 
                    label={user.status} 
                    color={getStatusChipColor(user.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  {user.userType !== 'Admin' ? (
                    <>
                      {user.status !== 'Active' && (
                        <IconButton 
                          onClick={() => handleStatusChange(user.userId, 'Active')} 
                          color="success"
                          title="Set Active"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      )}
                      {user.status !== 'Suspended' && (
                        <IconButton 
                          onClick={() => handleStatusChange(user.userId, 'Suspended')} 
                          color="warning"
                          title="Set Suspended"
                        >
                          <PauseCircleIcon />
                        </IconButton>
                      )}
                      <IconButton 
                        onClick={() => handleDelete(user.userId)} 
                        color="error"
                        title="Delete User"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <DoNotDisturbIcon color="disabled" /> 
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminDashboard;