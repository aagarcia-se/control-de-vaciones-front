import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, styled, Avatar, Button, Popover, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Ícono de Home
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work'; // Datos laborales
import SchoolIcon from '@mui/icons-material/School'; // Estudios
import InfoIcon from '@mui/icons-material/Info'; // Datos generales
import VacationIcon from '@mui/icons-material/BeachAccess'; // Programación de vacaciones
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Ícono de cerrar sesión
import { getLocalStorageData } from '../../../services/session/getLocalStorageData.js';
import useLogout from '../../../services/session/logout.js';
import { useNavigate } from 'react-router-dom';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#333', // Fondo oscuro
    color: '#fff', // Texto blanco
    borderRight: '1px solid #444', // Borde ligeramente más claro
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SidebarListItem = styled(ListItem)({
  '&:hover': {
    backgroundColor: '#555', // Color de fondo en hover
  },
});

const AvatarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  borderBottom: '1px solid #444',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer', // Cambia el cursor a una mano cuando se pasa por encima
  width: 50, // Tamaño aumentado del avatar
  height: 50, // Tamaño aumentado del avatar
}));

const LogoutButton = styled(Button)({
  marginTop: 'auto', // Empujar el botón hacia abajo
  backgroundColor: '#f44336', // Rojo
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d32f2f', // Rojo más oscuro en hover
  },
});

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate(); // Hook para navegación
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userData = getLocalStorageData();
  const userInitial = userData?.primerNombre.charAt(0).toUpperCase();
  const { handleLogout } = useLogout();


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <CustomDrawer
        variant="permanent"
        sx={{ display: { xs: 'none', md: 'block' } }} // Ocultar en pantallas pequeñas
        open
      >
        <AvatarContainer>
          <StyledAvatar 
            sx={{ bgcolor: '#4053ac', color: '#fff' }} 
            onClick={handleAvatarClick}
          >
            {userInitial}
          </StyledAvatar>
        </AvatarContainer>
        <List>
          <SidebarListItem button onClick={() => navigate('/empleados/home')}>
            <ListItemIcon><HomeIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Home" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/infoPersonal')}>
            <ListItemIcon><ContactsIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Información Personal" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/family')}>
            <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Familiares" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button>
            <ListItemIcon><WorkIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Laborales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/informacion-profesional')}>
            <ListItemIcon><SchoolIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Informacion Profesional" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button>
            <ListItemIcon><InfoIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Generales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button>
            <ListItemIcon><VacationIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Programar Vacaciones" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <Divider sx={{ backgroundColor: '#444' }} />
        </List>
      </CustomDrawer>

      <CustomDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
        sx={{ display: { xs: 'block', md: 'none' } }} // Mostrar solo en pantallas pequeñas
      >
        <AvatarContainer>
          <StyledAvatar 
            sx={{ bgcolor: '#FF5722', color: '#fff' }} 
            onClick={handleAvatarClick}
          >
            {userInitial}
          </StyledAvatar>
        </AvatarContainer>
        <List>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><HomeIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Home" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><ContactsIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Información Personal" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Familiares" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><WorkIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Laborales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><SchoolIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Informacion profesional" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><InfoIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Generales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={handleDrawerToggle}>
            <ListItemIcon><VacationIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Programación de Vacaciones" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <Divider sx={{ backgroundColor: '#444' }} />
        </List>
      </CustomDrawer>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          "& .MuiPopover-paper": {
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">
            ¡Hola, {userData?.primerNombre || "Usuario"}!
          </Typography>
          <Typography variant="body2">
            @{userData?.usuario || "Invitado"}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Button
            fullWidth
            sx={{ justifyContent: "flex-start" }}
            onClick={() => {
              // Acción para gestionar cuenta
              alert("Gestionar cuenta");
            }}
          >
            Gestionar cuenta
          </Button>
          <Button
            fullWidth
            startIcon={<ExitToAppIcon />} // Agregar ícono de Logout
            sx={{
              justifyContent: "flex-start",
              color: "#ffffff",
              backgroundColor: "#df4752",
              "&:hover": {
                backgroundColor: "#eb383e",
              },
            }}
            onClick={handleLogout} // Acción para cerrar sesión
          >
            Cerrar sesión
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Sidebar;
