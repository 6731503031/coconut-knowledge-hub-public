import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AddProductForm from '../components/AddProductForm';
import MyProductList from '../components/MyProductList';

import { Container, Typography, Box } from '@mui/material';

function EntrepreneurDashboard() {

    const { userEmail } = useAuth();
    const [listKey, setListKey] = useState(() => Date.now());
    const handleProductAdded = () => {
      setListKey(Date.now());
    };

    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Entrepreneur Dashboard
        </Typography>
        <Typography component="p" gutterBottom>
          ยินดีต้อนรับ, <strong>{userEmail}</strong>! 
          นี่คือหน้าจัดการสินค้าของคุณ
        </Typography>

        <AddProductForm onProductAdded={handleProductAdded} />

        <hr style={{ margin: '2rem 0' }} />

        <MyProductList key={listKey} />
      </Container>
    );
}

export default EntrepreneurDashboard;