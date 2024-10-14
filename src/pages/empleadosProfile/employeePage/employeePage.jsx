import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import Spinner from "../../../components/spinners/spinner";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deepPurple } from "@mui/material/colors";
import { useDatosLaborales } from "../../../hooks/EmpleadosHooks/useDatosLaboales";
import { useCheckSession } from "../../../services/session/checkSession";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";


const EmployeePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { datosLaborales, error, loading } = useDatosLaborales();
  const isSessionVerified = useCheckSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading || !isSessionVerified) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "130vh", backgroundColor: "#f5f5f5" }}>
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
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Información Laboral
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {/* Nombre del Cargo */}
              <Grid item xs={12} md={6}>
                <Card sx={{ display: "flex", alignItems: "center" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box display="flex" alignItems="center">
                      <BusinessCenterIcon
                        sx={{ color: deepPurple[500], mr: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        Cargo:
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {datosLaborales ? datosLaborales.puesto : "Sin datos"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Salario */}
              <Grid item xs={12} md={6}>
                <Card sx={{ display: "flex", alignItems: "center" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box display="flex" alignItems="center">
                      <MonetizationOnIcon
                        sx={{ color: deepPurple[500], mr: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        Salario:
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {datosLaborales && datosLaborales.salario
                        ? `Q. ${datosLaborales.salario}`
                        : "Sin datos"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Fecha de Contratación */}
              <Grid item xs={12} md={6}>
                <Card sx={{ display: "flex", alignItems: "center" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box display="flex" alignItems="center">
                      <CalendarTodayIcon
                        sx={{ color: deepPurple[500], mr: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        Fecha de Contratación:
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {datosLaborales && datosLaborales.fechaIngreso
                        ? new Date(
                            datosLaborales.fechaIngreso
                          ).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "Sin datos"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Resto de los campos... */}
            </Grid>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default EmployeePage;
