import React, { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 1. [!!! แก้ไข PATH !!!] - เพิ่ม '../' เพื่อกลับออกไป 1 ชั้น
//    (จาก layouts/ -> src/ -> context/ หรือ components/)
import { useAuth } from '../context/AuthContext'; 
import SideMenu from '../components/Sidemenu'; // 2. [!!! แก้ไข Casing เป็น 'Sidemenu' (ตัวเล็ก) !!!]
import SearchBar from '../components/SearchBar'; 
import LanguageSwitcher from '../components/LanguageSwitcher'; 

// (Imports Material-UI เหมือนเดิม)
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; 

function MainLayout() {
  const { t } = useTranslation();
  const { token, userEmail, userType, logoutAction } = useAuth();
  const location = useLocation(); 

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    logoutAction();
    window.location.href = '/';
  };

  const showSearchBar = location.pathname !== '/search';

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* 3. Header (AppBar) ที่ "ติดอยู่ข้างบน" (Fixed) */}
      <AppBar 
        position="fixed" // <-- แก้เป็น "fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            
            {/* 4. ปุ่ม 3 แถบ (Hamburger Menu) */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle} 
              sx={{ mr: 2, display: { md: 'none' } }} // แสดงเฉพาะจอมือถือ
            >
              <MenuIcon />
            </IconButton>
            
            {/* โลโก้ */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: 'flex', 
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {t('navbar.logo')}
            </Typography>

            {/* 5. เมนูบน Header (ซ่อนในจอมือถือ) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={RouterLink} to="/products" sx={{ color: 'white' }}>
                {t('navbar.catalog')}
              </Button>
              <Button component={RouterLink} to="/varieties" sx={{ color: 'white' }}>
                 {t('navbar.varieties')}
              </Button>
              <Button component={RouterLink} to="/articles" sx={{ color: 'white' }}>
                 {t('navbar.articles')}
              </Button>
              <Button component={RouterLink} to="/prices" sx={{ color: 'white' }}>
                 {t('navbar.prices')}
              </Button>

              {userType === 'Entrepreneur' && (
                <Button component={RouterLink} to="/dashboard/entrepreneur" sx={{ color: 'yellow', fontWeight: 'bold' }}>
                  {t('navbar.dashboard_entrepreneur')}
                </Button>
              )}
              {userType === 'Admin' && (
                <Button component={RouterLink} to="/dashboard/admin" sx={{ color: 'red', fontWeight: 'bold' }}>
                  {t('navbar.dashboard_admin')}
                </Button>
              )}
            </Box>

            {/* 6. LanguageSwitcher และปุ่ม Auth (ด้านขวา) */}
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <LanguageSwitcher />
              
              {/* ซ่อนปุ่ม Auth ในจอมือถือ */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {token ? (
                  <>
                    <Typography component="span" sx={{ mr: 2, fontSize: '0.9rem', alignSelf: 'center' }}>
                      {t('navbar.hi', { email: userEmail })}
                    </Typography>
                    <Button onClick={handleLogout} color="inherit">
                      {t('navbar.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button component={RouterLink} to="/login" color="inherit">
                      {t('navbar.login')}
                    </Button>
                    <Button component={RouterLink} to="/register" color="inherit">
                      {t('navbar.register')}
                    </Button>
                  </>
                )}
              </Box>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* 7. SideMenu (Drawer) ที่เรียกใช้ */}
      <SideMenu 
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        userType={userType}
        token={token}
        handleLogout={handleLogout}
      />

      {/* 8. ส่วนเนื้อหาหลัก */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {/* [!!! สำคัญ !!!] ดันเนื้อหาลงมาไม่ให้โดน AppBar (Fixed) บัง */}
        <Toolbar /> 
        
        <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
          
          {showSearchBar && <SearchBar />} 
          
          <Box sx={{ mt: 2 }}>
            <Outlet /> {/* <-- หน้าลูกๆ (HomePage, ฯลฯ) จะมาแสดงตรงนี้ */}
          </Box>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              {t('footer.copyright')} {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;