// src/components/SideMenu.jsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext'; 

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GrassIcon from '@mui/icons-material/Grass';
import ArticleIcon from '@mui/icons-material/Article';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const drawerWidth = 240;

function SideMenu({ isDrawerOpen, handleDrawerToggle, handleLogout }) {
  const { t } = useTranslation();
  const { token, userEmail, userType } = useAuth(); 

  const drawerContent = (
    <Box 
      sx={{ width: drawerWidth, overflow: 'auto' }} 
      role="presentation"
      onClick={handleDrawerToggle} 
      onKeyDown={handleDrawerToggle}
    >
      <Toolbar />
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={t('Home') || 'Home'} /> 
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/products">
            <ListItemIcon><StorefrontIcon /></ListItemIcon>
            <ListItemText primary={t('navbar.catalog')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/varieties">
            <ListItemIcon><GrassIcon /></ListItemIcon>
            <ListItemText primary={t('navbar.varieties')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/articles">
            <ListItemIcon><ArticleIcon /></ListItemIcon>
            <ListItemText primary={t('navbar.articles')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/prices">
            <ListItemIcon><PriceChangeIcon /></ListItemIcon>
            <ListItemText primary={t('navbar.prices')} />
          </ListItemButton>
        </ListItem>
      </List>
      
      <Divider />
      
      <List>
        {(userType && userType.toLowerCase() === 'entrepreneur') && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/dashboard/entrepreneur">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={t('navbar.dashboard_entrepreneur')} />
            </ListItemButton>
          </ListItem>
        )}
        {(userType && userType.toLowerCase() === 'admin') && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/dashboard/admin">
              <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
              <ListItemText primary={t('navbar.dashboard_admin')} />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />
      
      <List>
        {token ? (
          <>
            <ListItem sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 0 }}>
              <Typography variant="caption" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t('navbar.hi', { email: userEmail })}
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary={t('navbar.logout')} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/login">
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary={t('navbar.login')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/register">
                <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
                <ListItemText primary={t('navbar.register')} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary" 
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, 
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default SideMenu;