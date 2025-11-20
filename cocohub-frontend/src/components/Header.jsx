
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ handleDrawerToggle, userAuth, handleLogout }) {
  const { t } = useTranslation();
  const location = useLocation();

  const { token, userEmail, userType } = userAuth;


  const hideOnPaths = ['/', '/login', '/register'];
  const hasLocalSearchPrefixes = ['/varieties', '/articles'];

  const showSearchBar =
    !hideOnPaths.includes(location.pathname) &&
    !hasLocalSearchPrefixes.some(prefix => location.pathname.startsWith(prefix));
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('navbar.logo')} {/* [Logo] [Web-name] */}
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              px: 2
            }}
          >
            {showSearchBar && <SearchBar />}
          </Box>

          <Box sx={{ display: 'flex' }}>
            <LanguageSwitcher />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {(userType && userType.toLowerCase() === 'entrepreneur') && (
                <Button component={RouterLink} to="/dashboard/entrepreneur" sx={{ color: 'yellow', fontWeight: 'bold' }}>
                  {t('navbar.dashboard_entrepreneur')}
                </Button>
              )}
              {(userType && userType.toLowerCase() === 'admin') && (
                <Button component={RouterLink} to="/dashboard/admin" sx={{ color: 'red', fontWeight: 'bold' }}>
                  {t('navbar.dashboard_admin')}
                </Button>
              )}
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
  );
}

export default Header;