import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  Avatar,
  styled,
  Badge,
  IconButton,
  Popover,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People"; // Icono para "Lista Empleados"
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Icono para "Ingresar Empleado"
import NotificationsIcon from "@mui/icons-material/Notifications"; // Icono de "Notificaciones"
import useLogout from "../../services/session/logout.js";
import { getLocalStorageData } from "../../services/session/getLocalStorageData.js";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#4caf50",
    color: "#4caf50",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: 0, // Asegurar que el borde sea recto
  "&:hover": {
    backgroundColor: "#133d80", // Hover más pronunciado en color azul
    borderRadius: "6px", // Opcional: pequeño radio para que no sea completamente cuadrado
  },
  color: "#ffffff",
}));


function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleLogout } = useLogout();

  // Obtener datos del usuario desde localStorage
  const userData = getLocalStorageData();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e88e5" }}>
      <Toolbar>
        {/* Agregar Logo */}
        {/* <IconButton
          color="inherit"
          aria-label="logo"
          onClick={() => (window.location.href = "/panel")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaypePzMzS_4eqa5v7dxPEwauOWLmX00Y_A&s"
            alt="Logo"
            style={{ height: 40 }}
          />
        </IconButton> */}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ffffff" }}
        >
          Consejo Nacional de Adopción
        </Typography>

        {/* Opción Home con palabra "Home" al lado */}
        <NavButton
          color="inherit"
          aria-label="home"
          onClick={() => (window.location.href = "/panel")}
        >
          <HomeIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Home
          </Typography>
        </NavButton>

        {/* Opción Ingresar Empleado */}
        <NavButton
          color="inherit"
          aria-label="ingresar empleado"
          onClick={() => (window.location.href = "ingresar-nuevo-empleado")}
          sx={{ ml: 2 }}
        >
          <PersonAddIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Ingresar Empleado
          </Typography>
        </NavButton>

        {/* Opción Lista Empleados */}
        <NavButton
          color="inherit"
          aria-label="lista empleados"
          onClick={() => (window.location.href = "/lista-de-empleados")}
          sx={{ ml: 2 }}
        >
          <PeopleIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Lista Empleados
          </Typography>
        </NavButton>

        {/* Icono de Notificaciones */}
        <IconButton color="inherit" aria-label="notificaciones">
          <NotificationsIcon />
        </IconButton>

        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar onClick={handleAvatarClick} sx={{ cursor: "pointer" }}>
            {userData?.primerNombre?.[0].toUpperCase() || "U"}
          </Avatar>
        </StyledBadge>

        {/* Popover para opciones del usuario */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
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
              startIcon={<LogoutIcon />} // Agregar ícono de Logout
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
