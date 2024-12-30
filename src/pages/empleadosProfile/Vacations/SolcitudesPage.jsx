import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  MenuItem,
  Grid,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import { useSolicitudes } from "../../../hooks/VacationAppHooks/useSolicitudes";
import axios from "axios";
import { formatDateToDisplay } from "../../../services/utils/dates/vacationUtils";
import { useRedirectPage } from "../../../hooks/LoginHooks/RedirectLoginHook";

const SolicitudesPage = () => {
  //VAlidar sesion y permisos
  const isSessionVerified = useCheckSession();
  const userData = getLocalStorageData();
  useRedirectPage(userData);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [descripcionRechazo, setDescripcionRechazo] = useState("");
  const [searchText, setSearchText] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [isEstadoChanged, setIsEstadoChanged] = useState(false); // Nuevo estado para controlar el cambio en el estado
  const { solicitudesU, cantadSolicitudes, errorU, loadingU } =
    useSolicitudes();
  const [successOpen, setSuccessOpen] = useState(false);

  const handleVerSolicitud = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setModalOpen(true);
    setDescripcionRechazo(""); // Reiniciar la descripción al abrir el modal
    if (solicitud) setIsEstadoChanged(false); // Reiniciar el estado de cambio al abrir el modal
  };

  const handleAutorizar = async () => {
    if (!selectedSolicitud) return;

    const payload = {
      estadoSolicitud: "autorizadas", // Cambia el estado a "autorizada"
      idEmpleado: selectedSolicitud.idEmpleado, // Suponiendo que tienes el idEmpleado en userData
      idSolicitud: selectedSolicitud.idSolicitud,
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/UpdateEstadoSolicitud",
        payload
      );
      setSuccessOpen(true); // Mostrar Snackbar de éxito
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al autorizar la solicitud:", error);
      alert("Hubo un error al autorizar la solicitud.");
    }
  };

  const handleRechazar = async () => {
    if (!descripcionRechazo) {
      alert("La descripción es requerida para rechazar la solicitud");
      return;
    }

    const payload = {
      estadoSolicitud: "rechazada", // Cambia el estado a "rechazada"
      idEmpleado: selectedSolicitud.idEmpleado, // Suponiendo que tienes el idEmpleado en userData
      idSolicitud: selectedSolicitud.idSolicitud,
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/UpdateEstadoSolicitud",
        payload
      );
      setSuccessOpen(true); // Mostrar Snackbar de éxito
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      alert("Hubo un error al rechazar la solicitud.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDescripcionRechazo("");
  };

  const filteredSolicitudes = solicitudesU
    .filter(
      (solicitud) =>
        solicitud.nombreCompleto
          .toLowerCase()
          .includes(searchText.toLowerCase()) &&
        (estadoFilter ? solicitud.estadoSolicitud === estadoFilter : true)
    )
    .sort((a, b) => b.idSolicitud - a.idSolicitud); // Ordenar de mayor a menor

  const handleChangeEstado = (event) => {
    if (selectedSolicitud) {
      const nuevoEstado = event.target.value;
      setSelectedSolicitud({
        ...selectedSolicitud,
        estado: nuevoEstado,
      });
      setIsEstadoChanged(
        nuevoEstado !==
          solicitudes.find((s) => s.id === selectedSolicitud.id).estado
      ); // Indica si el estado ha cambiado
    }
  };

  const isRechazada = selectedSolicitud?.estado === "rechazada";

  if (!isSessionVerified || loadingU) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: solicitudesU && solicitudesU.length > 5 ? "0" : "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{ mr: 2, display: { md: "none" } }}
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

      <Box
        component="main"
        sx={{ flexGrow: 1, mr: 5, p: 3, ml: { md: "65px" } }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          SOLICITUDES
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2, mr: 40 }}>
          <TextField
            label="Buscar por empleado"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "green" },
              },
            }}
          />
          <TextField
            select
            label="Filtrar por estado"
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            variant="outlined"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="enviada">En espera</MenuItem>
            <MenuItem value="autorizadas">Autorizadas</MenuItem>
            <MenuItem value="rechazada">Rechazada</MenuItem>
            <MenuItem value="finalizadas">Finalizadas</MenuItem>
          </TextField>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table aria-label="solicitudes table">
            <TableHead>
              <TableRow>
                {["ID", "Empleado", "Tipo Solicitud", "Estado", "Acción"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#424242",
                        color: "#fff",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudesU && solicitudesU.length > 0 ? (
                filteredSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.idSolicitud}>
                    <TableCell align="center">
                      {"SLVC" + solicitud.idSolicitud}
                    </TableCell>
                    <TableCell align="center">
                      {solicitud.nombreCompleto}
                    </TableCell>
                    <TableCell align="center">
                      Solicitud de vacaciones
                    </TableCell>
                    <TableCell align="center">
                      {solicitud.estadoSolicitud === "enviada"
                        ? "En espera de aprobación"
                        : solicitud.estadoSolicitud === "autorizadas"
                        ? "Vacaciones autorizadas"
                        : solicitud.estadoSolicitud === "rechazada"
                        ? "Vacaciones Rechazadas"
                        : "Vacaciones Finalizadas"}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVerSolicitud(solicitud)}
                      >
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6" sx={{ color: "gray" }}>
                      No hay solicitudes disponibles.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar para mostrar el mensaje de éxito */}
        <Snackbar
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posición superior derecha
          //autoHideDuration={6000000} // Duración de la visibilidad
          TransitionComponent={Slide} // Transición para la animación
          sx={{
            "& .MuiSnackbarContent-root": {
              padding: "8px 16px",
              minWidth: "200px",
            },
          }} // Estilo para el contenido
        >
          <Alert
            onClose={() => setSuccessOpen(false)}
            severity="success"
            sx={{
              width: "100%",
              fontSize: "1.0Srem",
              backgroundColor: "#28a745", // Color verde Bootstrap
              color: "#ffffff", // Color de texto blanco para contraste
              "& .MuiAlert-icon": {
                color: "#ffffff", // Color del icono
              },
              "& .MuiAlert-action": {
                color: "#ffffff", // Color de acción si se añade un botón
              },
            }} // Cambiar tamaño de fuente y ancho
          >
            Solicitud enviada exitosamente
          </Alert>
        </Snackbar>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "2%", // Ajustamos un margen superior pequeño
              left: "55%",
              transform: "translate(-50%, 0)", // Solo centramos horizontalmente
              width: "80vw", // Más ancho para mostrar más contenido
              maxWidth: "700px", // Máximo ancho
              bgcolor: "white",
              borderRadius: 2,
              p: 4,
              boxShadow: 24,
              overflow: "hidden", // Ocultamos cualquier desbordamiento
              outline: "none",
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 16, right: 16, color: "red" }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <InfoIcon sx={{ color: "primary.main", fontSize: 50 }} />
            </Box>

            {selectedSolicitud && (
              <>
                <Typography variant="h6" gutterBottom textAlign="center">
                  Detalles de la Solicitud
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Gestión:
                    </Typography>
                    {"SLVC" + selectedSolicitud.idSolicitud}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Empleado:
                    </Typography>
                    {selectedSolicitud.nombreCompleto}
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Fecha inicio vacaciones:
                    </Typography>
                    {formatDateToDisplay(
                      selectedSolicitud.fechaInicioVacaciones
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Fecha Fin vacaciones:
                    </Typography>
                    {formatDateToDisplay(selectedSolicitud.fechaFinVacaciones)}
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Fecha retorno a labores:
                    </Typography>
                    {formatDateToDisplay(selectedSolicitud.fechaRetornoLabores)}
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" fontWeight="bold">
                      Cantidad de días solicitados:
                    </Typography>
                    {selectedSolicitud.cantidadDiasSolicitados}
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Estado de la solicitud
                  </Typography>
                  {selectedSolicitud.estadoSolicitud}
                </Grid>

                {(selectedSolicitud.estadoSolicitud === "rechazada" ||
                  selectedSolicitud.estadoSolicitud === "enviada") && (
                  <TextField
                    label="Descripción del Rechazo"
                    variant="outlined"
                    fullWidth
                    value={
                      selectedSolicitud.estadoSolicitud === "rechazada"
                        ? selectedSolicitud.descripcionRechazo
                        : descripcionRechazo
                    }
                    onChange={(e) => setDescripcionRechazo(e.target.value)}
                    sx={{ mt: 2 }}
                    inputProps={{
                      readOnly: selectedSolicitud.estadoSolicitud !== "enviada",
                    }} // Asegúrate de usar inputProps aquí
                  />
                )}

                {selectedSolicitud.estadoSolicitud === "enviada" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center", // Centrar los botones
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleAutorizar}
                      disabled={selectedSolicitud.estadoSolicitud !== "enviada"} // Deshabilitar si no está en estado 'enviada'
                      sx={{
                        backgroundColor: "#28a745",
                        "&:hover": { backgroundColor: "#218838" },
                        mt: 3,
                        mx: 1, // Separación horizontal entre botones
                      }}
                    >
                      Autorizar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleRechazar}
                      disabled={selectedSolicitud.estadoSolicitud !== "enviada"} // Deshabilitar si no está en estado 'enviada'
                      sx={{
                        backgroundColor: "#dc3545",
                        "&:hover": { backgroundColor: "#c82333" },
                        mt: 3,
                        mx: 1, // Separación horizontal entre botones
                      }}
                    >
                      Rechazar
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default SolicitudesPage;
