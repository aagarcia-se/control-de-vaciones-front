import React, { useState } from 'react';
import { Box, Grid, Toolbar, IconButton } from '@mui/material';
import Sidebar from '../../../components/EmpleadosPage/SideBar/SideBar';
import SearchBar from '../../../components/EmpleadosPage/SerchBar/SerchBar';
import ContactProfile from '../../../components/EmpleadosPage/ContactProfile/ContactProfile';
import ContactDetails from '../../../components/EmpleadosPage/ContactDetails/ContactDetails';
import ActionsMenu from '../../../components/EmpleadosPage/ActionMenu/ActionMenu';
import MenuIcon from '@mui/icons-material/Menu';

const ContactsPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f1f3f4'}}>
      {/* Botón de hamburguesa para abrir el menú en pantallas pequeñas */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Box 
      sx={{ width: { md: '240px' }, flexShrink: 0, overflowY: 'auto', borderRight: '1px solid #ddd' }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Main content area */}
      <Box component="main" sx={{flexGrow: 1, padding: 3 }}>
        {/* Profile and details */}
        <Grid container spacing={2} sx={{ marginTop: 2}}>
          <Grid 
          item xs={12} 
          md={8} 
          sx={{ 
            marginLeft: "130px",
            paddingRight: { md: '20px'}
            }}>
            <ContactProfile />
            <ContactDetails />
          </Grid>
          <Grid item xs={1} md={1} >
            <ActionsMenu />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactsPage;