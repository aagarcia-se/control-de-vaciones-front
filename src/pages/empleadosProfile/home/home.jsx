import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Link,
  IconButton,
} from "@mui/material";
import Spinner from "../../../components/spinners/spinner";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { deepPurple, green, blue } from "@mui/material/colors";
import { useDatosLaborales } from "../../../hooks/EmpleadosHooks/useDatosLaboales";
import { useCheckSession } from "../../../services/session/checkSession";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import dayjs from "dayjs";

const HomePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { datosLaborales, error, loading } = useDatosLaborales();
  const isSessionVerified = useCheckSession();
  const userData = getLocalStorageData();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función para determinar el saludo adecuado según la hora
  const getGreeting = () => {
      // Obtener la hora actual
  const hour = dayjs().hour();
  
    if (hour >= 6 && hour < 12) {
      return "Buenos días";
    } else if (hour >= 12 && hour < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  if (loading || !isSessionVerified) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Botón de menú para dispositivos móviles */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { xs: mobileOpen ? "240px" : 0, md: "240px" },
          flexShrink: { md: 0 },
          overflowY: "auto",
          transition: "width 0.3s",
          borderRight: { md: "1px solid #ddd" },
          position: { xs: "absolute", md: "relative" },
          zIndex: 1200,
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      {/* Sección Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "65px" } }}>
        {error ? (
          <Grid sx={{ mt: 3 }}>
            <ErrorAlert message={error} visible={true} />
          </Grid>
        ) : (
          <>
            {/* Encabezado */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              {getGreeting()} {userData.primerNombre}
            </Typography>

            {/* Notificación destacada */}
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                mb: 3,
                mt: 4,
                backgroundColor: green[50],
                color: green[800],
                borderLeft: `5px solid ${green[700]}`,
              }}
            >
              <NotificationsActiveIcon sx={{ mr: 2, color: green[600] }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Programa tus vacaciones este {dayjs().year()}
                </Typography>
                <Typography variant="body1">
                  Presione <Link href="#">aquí para programar tus vacaciones</Link>. Recuerde que esto es una obligatoriedad laboral.
                </Typography>
              </Box>
            </Paper>

            {/* Sección de módulos */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    mt: 5,
                  }}
                >
                  <InfoIcon sx={{ fontSize: 40, color: blue[500] }} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 1, color: blue[800] }}
                  >
                    Indicaciones
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Programa un máximo de 20 días, según lo estipulado por la ley.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    mt: 5,
                  }}
                >
                  <HelpOutlineIcon sx={{ fontSize: 40, color: blue[500] }} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 1, color: blue[800] }}
                  >
                    Ayuda
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Si tiene alguna duda o necesita ayuda también puede consultar el <Link href="#">Manual de Usuario</Link>.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    mt: 5,
                  }}
                >
                  <LibraryBooksIcon sx={{ fontSize: 40, color: blue[500] }} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 1, color: blue[800] }}
                  >
                    Revisión de status
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Consulta el status actual de tu solicitud de vacaciones.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
