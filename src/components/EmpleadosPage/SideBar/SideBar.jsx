import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, styled, Avatar, Button, Popover, Typography, Box, Badge } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Importa el ícono
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import VacationIcon from '@mui/icons-material/BeachAccess';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getLocalStorageData } from '../../../services/session/getLocalStorageData.js';
import useLogout from '../../../services/session/logout.js';
import { useNavigate } from 'react-router-dom';
import { useSolicitudes } from '../../../hooks/VacationAppHooks/useSolicitudes.js';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#333',
    color: '#fff',
    borderRight: '1px solid #444',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SidebarListItem = styled(ListItem)( {
  '&:hover': {
    backgroundColor: '#555',
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
  cursor: 'pointer',
  width: 50,
  height: 50,
}));

const LogoutButton = styled(Button)({
  marginTop: 'auto',
  backgroundColor: '#f44336',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userData = getLocalStorageData();
  const userInitial = userData?.primerNombre.charAt(0).toUpperCase();
  const { handleLogout } = useLogout();
  const { cantadSolicitudes } = useSolicitudes();

  // Obtener idRol desde localStorage
  const idRol = userData?.idRol; // Asegúrate de que getLocalStorageData devuelva idRol
  const notificationCount = cantadSolicitudes; // Aquí puedes cambiar el número de notificaciones

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
        sx={{ display: { xs: 'none', md: 'block' } }}
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
          <SidebarListItem button onClick={() => navigate('/empleados/informacion-laboral')}>
            <ListItemIcon><WorkIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Laborales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/informacion-profesional')}>
            <ListItemIcon><SchoolIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Informacion Profesional" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/informacion-General')}>
            <ListItemIcon><InfoIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Datos Generales" sx={{ color: '#fff' }} />
          </SidebarListItem>
          <SidebarListItem button onClick={() => navigate('/empleados/programar-vacaciones')}>
            <ListItemIcon><VacationIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Programar Vacaciones" sx={{ color: '#fff' }} />
          </SidebarListItem>

          {/* Opción "Solicitudes" solo si idRol es 5 */}
          {idRol === 5 && (
            <SidebarListItem button onClick={() => navigate('/empleados/solicitudes')}>
              <ListItemIcon>
                <Badge badgeContent={notificationCount} color="error">
                  <CheckCircleIcon  sx={{ color: '#fff' }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Solicitudes" sx={{ color: '#fff' }} />
            </SidebarListItem>
          )}
          <Divider sx={{ backgroundColor: '#444' }} />
        </List>
      </CustomDrawer>

      {/* Código del Drawer temporal para móviles */}

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
              alert("Gestionar cuenta");
            }}
          >
            Gestionar cuenta
          </Button>
          <Button
            fullWidth
            startIcon={<ExitToAppIcon />}
            sx={{
              justifyContent: "flex-start",
              color: "#ffffff",
              backgroundColor: "#df4752",
              "&:hover": {
                backgroundColor: "#eb383e",
              },
            }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Sidebar;
