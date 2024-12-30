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
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People"; // Icono para "Lista Empleados"
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Icono para "Ingresar Empleado"
import NotificationsIcon from "@mui/icons-material/Notifications"; // Icono de "Notificaciones"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Icono para dropdown
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
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#133d80",
    borderRadius: "6px",
  },
  color: "#ffffff",
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null); // Estado para el menú de reportes
  const { handleLogout } = useLogout();

  // Obtener datos del usuario desde localStorage
  const userData = getLocalStorageData();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e88e5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ffffff" }}
        >
          Consejo Nacional de Adopción
        </Typography>

        {/* Opción Home */}
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

        {/* Opción Suspensiones */}
        <NavButton
          color="inherit"
          aria-label="suspensiones"
          onClick={() => (window.location.href = "/suspensiones")}
          sx={{ ml: 2 }}
        >
          <PeopleIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Suspensiones
          </Typography>
        </NavButton>

        {/* Menú Dropdown para Reportes */}
        <NavButton
          color="inherit"
          aria-label="reportes"
          onClick={handleMenuClick}
          sx={{ ml: 2 }}
        >
          <Typography variant="body1" sx={{ ml: 1 }}>
            Reportes
          </Typography>
          <ArrowDropDownIcon />
        </NavButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              window.location.href = "/lista-de-empleados";
              handleMenuClose();
            }}
          >
            Empleados
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = "/vacaciones-empleados";
              handleMenuClose();
            }}
          >
            Vacaciones
          </MenuItem>
        </Menu>

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
                alert("Gestionar cuenta");
              }}
            >
              Gestionar cuenta
            </Button>
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
