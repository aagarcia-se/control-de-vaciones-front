// VacationApp.js
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
} from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { useNavigate } from "react-router-dom";
import { useSolicitudById } from "../../../hooks/VacationAppHooks/useSolicitudById";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";
import { validarFechaFin } from "../../../services/utils/dates/vacationUtils"; 
import { useFinalizarEstado } from "../../../hooks/VacationAppHooks/useFinalizarEstado";

// Mapeo de colores y etiquetas para los estados
const estadoStyles = {
  enviada: { color: "#90caf9", label: "Solicitud Enviada" },
  revisión: { color: "#d9c611", label: "Solicitud en revisión" },
  autorizadas: { color: "#a5d6a7", label: "Solicitud autorizada" },
  rechazada: { color: "#ef9a9a", label: "Solicitud rechazada" },
  finalizadas: { color: "#e483d3", label: "Vacaciones finalizadas" },
};

const VacationApp = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { solicitud, errorS, loadingS } = useSolicitudById();
  const navigate = useNavigate();
  useFinalizarEstado(solicitud);


  if (!isSessionVerified) {
    return <Spinner />;
  }

  const handleProgramar = () => {
    navigate("/empleados/programar-fecha");
  };

  const handleVerSolicitud = () => {
    navigate("/ver-solicitud-vacaciones");
  };

  // Función para renderizar el estado con Chip estilizado
  const renderEstado = (estado) => {
    const { color, label } = estadoStyles[estado.toLowerCase()] || {};
    return (
      <Chip
        label={label}
        sx={{
          backgroundColor: color,
          color: "#000",
          fontWeight: "bold",
          width: "175px",
          textAlign: "center",
        }}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f1f3f4" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { md: "none" } }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <MenuIcon />
      </IconButton>

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
        <Sidebar mobileOpen={mobileOpen} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "50px" } }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          CONTROL DE VACACIONES
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Proceso de planificación anual
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table aria-label="vacation table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Id Gestión
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Descripción
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Estado Actual
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Acción
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {errorS && errorS !== "NO EXISTE SOLICITUDES" ? (
                // Si hay error, solo mostramos la alerta de error.
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <ErrorAlert message={errorS} visible={true} />
                  </TableCell>
                </TableRow>
              ) : loadingS ? (
                // Si estamos cargando, mostramos la alerta de "Cargando datos..."
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Alert severity="info">Cargando datos de vacaciones...</Alert>
                  </TableCell>
                </TableRow>
              ) : (
                // Si no hay error ni carga, renderizamos los datos.
                <TableRow>
                  <TableCell align="center">
                    {solicitud?.idSolicitud || "..." }
                  </TableCell>
                  <TableCell align="center">
                    {solicitud ? "Solicitud de vacaciones" : "Sin Solicitudes" }
                  </TableCell>
                  <TableCell align="center">
                    {renderEstado(solicitud?.estadoSolicitud || "Sin Datos")}
                  </TableCell>
                  <TableCell align="center">
                    {!solicitud || solicitud?.estadoSolicitud?.toLowerCase() === "finalizadas" || solicitud?.estadoSolicitud?.toLowerCase() === "rechazada" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleProgramar}
                      >
                        Programar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#198754", color: "#fff" }}
                        onClick={handleVerSolicitud}
                      >
                        Ver
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default VacationApp;
