import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material"; // Agregamos Modal aquí
import WarningIcon from "@mui/icons-material/Warning"; // Asegúrate de importar el icono
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import dayjs from "dayjs";
import { useCheckSession } from "../../../services/session/checkSession";
import {
  calcularFechaFin,
  calcularProximaFechaLaboral,
  esDiaLaboral,
} from "../../../services/utils/dates/vacationUtils.js";
import useDiasFestivos from "../../../hooks/DiasFestivos/useDiasFestivos.js";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData.js";
import { ingresarSolicitudService } from "../../../services/VacationApp/InresarSolicitud.service.js";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { useSolicitudById } from "../../../hooks/VacationAppHooks/useSolicitudById.js";

const ProgramarVacacionesPage = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [diasVacaciones, setDiasVacaciones] = useState("0");
  const [endDate, setEndDate] = useState("");
  const [nextWorkDate, setNextWorkDate] = useState("");
  const [unidad, setUnidad] = useState("");
  const [idEmpleado, setIdEmpleado] = useState("");
  const [idInfoPersonal, setIdInfoPersonal] = useState("");
  const [diasHabilitado, setDiasHabilitado] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  const [modalLeyOpen, setModalLeyOpen] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  const { solicitud, diasValidos, errorS, loadingS } = useSolicitudById();
  console.log(diasValidos)

  const { isLoading, errorDF } = useDiasFestivos();
  const minStartDate = dayjs().add(7, "day").format("YYYY-MM-DD");
  const lastStartDate = dayjs()
    .endOf("year")
    .subtract(51, "day")
    .format("YYYY-MM-DD");

  const formatDateToDisplay = (date) => dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    const userData = getLocalStorageData();
    if (userData?.unidad) {
      setUnidad(userData.unidad);
      setIdEmpleado(userData.idEmpleado);
      setIdInfoPersonal(userData.idInfoPersonal);
    }
    // Verifica si hay una solicitud en proceso al cargar
    if (solicitud && (solicitud.estadoSolicitud == "enviada" || solicitud.estadoSolicitud == "autorizadas") ) {
      setModalOpen(true); // Abre el modal si hay una solicitud
    }

  }, [solicitud]); // Añadido el seguimiento a la solicitud

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!esDiaLaboral(selectedDate)) {
      alert("Por favor selecciona solo días hábiles (Lunes a Viernes).");
      setStartDate("");
      setDiasHabilitado(false);
      return;
    }
    setStartDate(selectedDate);
    setDiasVacaciones("");
    setDiasHabilitado(true);
    setEndDate("");
    setNextWorkDate("");
  };

  const handleDiasVacacionesChange = (e) => {
    const dias = parseInt(e.target.value, 10) || 0;
    setDiasVacaciones(dias);

    if (dias > 20) {
      alert("Solo puedes programar un máximo de 20 días.");
      setDiasVacaciones("");
      setEndDate("");
      setNextWorkDate("");
      return;
    }

    if (startDate && dias > 0) {
      const fechaFin = calcularFechaFin(startDate, dias);
      setEndDate(fechaFin.format("YYYY-MM-DD"));

      const proximaFechaLaboral = calcularProximaFechaLaboral(fechaFin);
      setNextWorkDate(proximaFechaLaboral.format("YYYY-MM-DD"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      idEmpleado,
      idInfoPersonal,
      unidadSolicitud: unidad,
      fechaInicioVacaciones: startDate,
      fechaFinVacaciones: endDate,
      fechaRetornoLabores: nextWorkDate,
      cantidadDiasSolicitados: diasVacaciones,
    };

    try {
      setDiasHabilitado(false);
      const res = await ingresarSolicitudService(payload);
      setSuccessOpen(true); // Mostrar Snackbar de éxito
      setTimeout(() => {
        navigate("/empleados/programar-vacaciones"); // Redirigir después de 3 segundos
      }, 1000);
    } catch (error) {
      setError(
        error.response
          ? "Error en la solicitud. Inténtalo de nuevo."
          : "Hubo un problema con el servicio. Intenta más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/empleados/programar-vacaciones"); // Redirigir al cerrar el modal
  };

  if (!isSessionVerified || !isLoading || loadingS) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f1f3f4" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
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
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: "0px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Roboto', 'cursive', sans-serif",
            color: "#054c95",
            fontWeight: "bold",
            mt: 10,
          }}
        >
          Programa tus vacaciones
        </Typography>

        <Box sx={{ height: 30, mb: 3 }}>
          {(error || (errorS && errorS !== "NO EXISTE SOLICITUDES")) && (
            <ErrorAlert message={error} visible={true} />
          )}
        </Box>

        <Paper
          component="form"
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: "500px",
            borderRadius: "8px",
            mb: 15,
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Fecha de inicio"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={handleStartDateChange}
                inputProps={{ min: minStartDate, max: lastStartDate }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Cantidad de días"
                type="number"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={diasVacaciones}
                onChange={handleDiasVacacionesChange}
                inputProps={{ min: 1 }}
                disabled={!diasHabilitado}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Fecha de fin"
                fullWidth
                value={endDate ? formatDateToDisplay(endDate) : ""}
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
                disabled={!diasHabilitado}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Fecha de reintegro"
                fullWidth
                value={nextWorkDate ? formatDateToDisplay(nextWorkDate) : ""}
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
                disabled={!diasHabilitado}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Unidad"
                fullWidth
                value={unidad}
                InputLabelProps={{ shrink: true }}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!diasHabilitado || loading || !diasVacaciones}
              >
                {loading ? <CircularProgress size={24} /> : "Enviar Solicitud"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

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

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "40%", // Ajustar el porcentaje para mover el modal más arriba
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400, // Ajusta el ancho según tus necesidades
              height: "auto", // Deja que el alto se ajuste automáticamente
              minHeight: 300, // Ajusta la altura mínima según tus necesidades
              borderRadius: 2, // Opcional: agrega bordes redondeados
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <WarningIcon color="warning" sx={{ fontSize: 40 }} />{" "}
              {/* Ajusta el tamaño del icono */}
            </Box>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{
                fontFamily: '"Times New Roman", Times, serif', // Tipo de letra más formal
                color: "#A00000", // Color rojo más fuerte
              }}
            >
              Solicitud en Proceso
            </Typography>

            {/* Información de la solicitud */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1">
                <strong>Número de Gestión:</strong>{" "}
                {solicitud ? solicitud.idSolicitud : "..."}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Fecha Inicio Vacaciones:</strong>{" "}
                {solicitud
                  ? new Date(
                      solicitud.fechaInicioVacaciones
                    ).toLocaleDateString("es-ES")
                  : "..."}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Fecha fin de vacaciones:</strong>{" "}
                {solicitud
                  ? new Date(solicitud.fechaFinVacaciones).toLocaleDateString(
                      "es-ES"
                    )
                  : "..."}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Fecha de Reintegro Laboral:</strong>{" "}
                {solicitud
                  ? new Date(solicitud.fechaRetornoLabores).toLocaleDateString(
                      "es-ES"
                    )
                  : "..."}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Días Solicitados:</strong>{" "}
                {solicitud ? solicitud.cantidadDiasSolicitados : "..."}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Estado de la Solicitud:</strong>{" "}
                {solicitud ? solicitud.estadoSolicitud : "..."}
              </Typography>
            </Box>

            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{ mt: 2, display: "block", mx: "auto" }}
            >
              Volver
            </Button>
          </Box>
        </Modal>

        <Modal
          open={!diasValidos && !solicitud}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "40%", // Ajustar el porcentaje para mover el modal más arriba
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400, // Ajusta el ancho según tus necesidades
              height: "auto", // Deja que el alto se ajuste automáticamente
              minHeight: 300, // Ajusta la altura mínima según tus necesidades
              borderRadius: 2, // Opcional: agrega bordes redondeados
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <WarningIcon color="warning" sx={{ fontSize: 40 }} />{" "}
              {/* Ajusta el tamaño del icono */}
            </Box>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{
                fontFamily: '"Times New Roman", Times, serif', // Tipo de letra más formal
                color: "#A00000", // Color rojo más fuerte
              }}
            >
              No puedes solicitar vacaciones
            </Typography>

            {/* Información de la solicitud */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1">
                <strong>Segun la ley 325 del organizmo judicial no cuentas con 150 dias laborados
                        Para poder programar tus primeras vacaciones.        
                </strong>{" "}
              </Typography>
            </Box>

            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{ mt: 2, display: "block", mx: "auto" }}
            >
              Volver
            </Button>
          </Box>
        </Modal>


      </Box>
    </Box>
  );
};

export default ProgramarVacacionesPage;
