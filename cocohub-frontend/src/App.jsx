
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/AuthContext';

import Header from './components/Header';
import SideMenu from './components/SideMenu';
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import VarietyDatabase from './pages/VarietyDatabase';
import VarietyDetail from './pages/VarietyDetail';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import SearchResultPage from './pages/SearchResultPage';
import MarketPricePage from './pages/MarketPricePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './App.css';

function App() {
  const { t } = useTranslation();
  const { token, userEmail, userType, logoutAction } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    logoutAction();
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>


        <Header
          handleDrawerToggle={handleDrawerToggle}
          userAuth={{ token, userEmail, userType }}
          handleLogout={handleLogout}
        />

        <SideMenu
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          userAuth={{ token, userType }}
          handleLogout={handleLogout}
        />




        <Box
          component="main"
          sx={{
            flexGrow: 1
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/varieties" element={<VarietyDatabase />} />
            <Route path="/varieties/:id" element={<VarietyDetail />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/prices" element={<MarketPricePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard/entrepreneur"
              element={
                <ProtectedRoute allowedUserType="Entrepreneur">
                  <EntrepreneurDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedUserType="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>

        <Box
          component="footer"
          sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}
        >

          <Typography variant="body2" color="text.secondary" align="center">
            {t('footer.copyright')} {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;