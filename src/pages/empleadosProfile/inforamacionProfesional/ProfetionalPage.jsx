import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import EventIcon from "@mui/icons-material/Event";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import axios from "axios";
import { useNivelEducativo } from "../../../hooks/EmpleadosHooks/useNivelEducativo";
import { useErrorAlert } from "../../../hooks/LoginHooks/useErrorAlert";


const ProfetionalPage = () => {
  const isSessionVerified = useCheckSession();
  const { nivelEducativo, error, loading } = useNivelEducativo();
  const { alertVisible } = useErrorAlert(error);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  if (loading || !isSessionVerified) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ display: "flex", height: "110vh", backgroundColor: "#eee9df" }}>
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

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingLeft: 10 }}>
        
        <Typography variant="h4" gutterBottom>
          Información Profesional
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Nivel Educativo */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#1976d2", margin: 1 }}>
                <SchoolIcon />
              </Avatar>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h6">Nivel Educativo</Typography>
                <Typography variant="body2" sx={{color: "#380555"}}>
                  {nivelEducativo
                    ? nivelEducativo.nivelDeEstudios
                    : "Sin Datos"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Último Nivel Alcanzado */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#388e3c", margin: 1 }}>
                <BadgeIcon />
              </Avatar>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h6">Último Nivel Alcanzado</Typography>
                <Typography variant="body2" color="text.secondary" sx={{color: "#380555"}}>
                  {nivelEducativo
                    ? nivelEducativo.ultimoNivelAlcanzado
                    : "Sin datos"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Último Nivel Alcanzado */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#d9c911", margin: 1 }}>
                <EditCalendarIcon />
              </Avatar>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h6">
                  Año del ultimo nivel alcanzado
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{color: "#380555"}}>
                  {nivelEducativo
                    ? new Date(
                        nivelEducativo.añoUltimoNivelCursado
                      ).getFullYear()
                    : "Sin datos"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {nivelEducativo && nivelEducativo.profesion && (
            <Grid item xs={12} md={6} lg={8}>
              <Card sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "#f57c00", margin: 1 }}>
                  <WorkIcon />
                </Avatar>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6">Profesión</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{color: "#380555"}}>
                    {nivelEducativo ? nivelEducativo.profesion : "Sin datos"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {nivelEducativo && nivelEducativo.numeroColegiado && (
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#e53935", margin: 1 }}>
                <BadgeIcon />
              </Avatar>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h6">Número Colegiado</Typography>
                <Typography variant="body2" color="text.secondary" sx={{color: "#380555"}}>
                  {nivelEducativo && nivelEducativo.numeroColegiado ? nivelEducativo.numeroColegiado : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          )}

          {nivelEducativo && nivelEducativo.fechaColegiacion && (
          <Grid item xs={12} md={6} lg={8} sx={{}}>
            <Card sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#3949ab", margin: 1 }}>
                <EventIcon />
              </Avatar>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h6">Fecha de Colegiación</Typography>
                <Typography variant="body2" color="text.secondary" sx={{color: "#380555"}}>
                  {nivelEducativo && nivelEducativo.fechaColegiacion ? nivelEducativo.fechaColegiacion : "No existe"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfetionalPage;
