import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HERO_IMAGE_URL = 'https://www.shutterstock.com/image-photo/coconut-tree-farm-juice-fruit-600nw-2566823053.jpg'; 
// 

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{

        height: 'calc(100vh - 64px)', 
        
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${HERO_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          fontWeight="bold" 
          gutterBottom
        >
          {t('navbar.logo')} 
        </Typography>
        
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ mb: 4 }}
        >
          ฐานข้อมูลความรู้และตลาดซื้อขายผลิตภัณฑ์มะพร้าวครบวงจร
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink} 
          to="/products"
        >
          {t('navbar.catalog')}
        </Button>
      </Container>
    </Box>
  );
}

export default HomePage;