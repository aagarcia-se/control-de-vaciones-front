import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import EventIcon from "@mui/icons-material/Event";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import axios from "axios";

const fakeData = {
  idNivelEducativo: 1,
  idInfoPersonal: 45,
  nivelDeEstudios: "Licenciatura en Ingeniería",
  ultimoNivelAlcanzado: "Tesis",
  profesion: "Ingeniero en Sistemas",
  numeroColegiado: "12345",
  fechaColegiacion: "2020-05-15"
};

const ProfetionalPage = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(fakeData); // Usamos datos fake por ahora.

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profesional"); // Aquí va tu endpoint real
        setData(response.data); // Reemplaza los datos fake cuando los recibas
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la información profesional.");
        setLoading(false);
      }
    };
    // Comentar esta línea mientras consumes datos fake
    // fetchData();
  }, []);

  if (!isSessionVerified) {
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
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingLeft: 10 }}>
        <Typography variant="h4" gutterBottom>
          Información Profesional
        </Typography>

        <Grid container spacing={3} sx={{mt: 2}}>
          {/* Nivel Educativo */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#1976d2', margin: 1 }}>
                <SchoolIcon />
              </Avatar>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">Nivel Educativo</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.nivelDeEstudios}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Último Nivel Alcanzado */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#388e3c', margin: 1 }}>
                <BadgeIcon />
              </Avatar>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">Último Nivel Alcanzado</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.ultimoNivelAlcanzado}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Profesión */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#f57c00', margin: 1 }}>
                <WorkIcon />
              </Avatar>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">Profesión</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.profesion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Número Colegiado */}
          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#e53935', margin: 1 }}>
                <BadgeIcon />
              </Avatar>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">Número Colegiado</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.numeroColegiado || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fecha de Colegiación */}
          <Grid item xs={12} md={6} lg={8} sx={{}}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#3949ab', margin: 1 }}>
                <EventIcon />
              </Avatar>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6">Fecha de Colegiación</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(data.fechaColegiacion).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfetionalPage;
