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
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { useNavigate } from "react-router-dom";
import { useSolicitudById } from "../../../hooks/VacationAppHooks/useSolicitudById";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";
import { useFinalizarEstado } from "../../../hooks/VacationAppHooks/useFinalizarEstado";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import { obtenerHistorialService } from "../../../services/VacationApp/Historial/ControlDiasVacaciones.service";
import { formatDateToDisplay } from "../../../services/utils/dates/vacationUtils";

const estadoStyles = {
  enviada: { color: "#90caf9", label: "Solicitud Enviada" },
  autorizadas: { color: "#a5d6a7", label: "Solicitud autorizada" },
  rechazada: { color: "#ef9a9a", label: "Solicitud rechazada" },
  finalizadas: { color: "#e483d3", label: "Vacaciones finalizadas" },
};

const VacationApp = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openHistorial, setOpenHistorial] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState(""); // Estado para el periodo seleccionado
  const [openSolicitudModal, setOpenSolicitudModal] = useState(false); // Estado para el modal de solicitud
  const { solicitud, errorS, loadingS } = useSolicitudById();
  const navigate = useNavigate();
  useFinalizarEstado(solicitud);

  console.log(solicitud);

  const userData = getLocalStorageData();

  if (!isSessionVerified) {
    return <Spinner />;
  }

  const handleProgramar = () => {
    navigate("/empleados/programar-fecha");
  };

  const handleOpenSolicitudModal = () => {
    setOpenSolicitudModal(true); // Abrir el modal de solicitud
  };

  const handleCloseSolicitudModal = () => {
    setOpenSolicitudModal(false); // Cerrar el modal de solicitud
  };

  const handleOpenHistorial = async () => {
    const { idEmpleado } = userData;
    setLoadingHistorial(true);
    try {
      const historialData = await obtenerHistorialService(idEmpleado);
      setHistorial(historialData.historial);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingHistorial(false);
      setOpenHistorial(true);
    }
  };

  const handleCloseHistorial = () => {
    setOpenHistorial(false);
    setSelectedPeriodo(""); // Limpiar el periodo seleccionado al cerrar el modal
  };

  const handlePeriodoChange = (event) => {
    setSelectedPeriodo(event.target.value);
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

  // Filtrar el historial basado en el periodo seleccionado
  const filteredHistorial = historial.filter((item) =>
    selectedPeriodo && selectedPeriodo !== "Todos"
      ? item.periodo === selectedPeriodo
      : true
  );

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

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "10px" } }}>
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
                {[
                  "Numero de Gestion",
                  "Descripción",
                  "Estado Actual",
                  "Acción",
                ].map((header) => (
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
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {errorS && errorS !== "NO EXISTE SOLICITUDES" ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <ErrorAlert message={errorS} visible={true} />
                  </TableCell>
                </TableRow>
              ) : loadingS ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Alert severity="info">
                      Cargando datos de vacaciones...
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center">
                    {solicitud
                      ? "SLVC-" + solicitud?.idSolicitud
                      : "No disponible"}
                  </TableCell>
                  <TableCell align="center">
                    {solicitud ? "Solicitud de vacaciones" : "Sin Solicitudes"}
                  </TableCell>
                  <TableCell align="center">
                    {renderEstado(solicitud?.estadoSolicitud || "Sin Datos")}
                  </TableCell>
                  <TableCell align="center">
                    {!solicitud ||
                    solicitud?.estadoSolicitud?.toLowerCase() ===
                      "finalizadas" ||
                    solicitud?.estadoSolicitud?.toLowerCase() ===
                      "rechazada" ? (
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
                        onClick={handleOpenSolicitudModal} // Cambiado para abrir el modal
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

        {/* Modal para mostrar la información de la solicitud */}
        <Modal
          open={openSolicitudModal}
          onClose={handleCloseSolicitudModal}
          aria-labelledby="solicitud-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "#ffffff",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // sombra suave
              borderRadius: 3, // bordes más redondeados
              p: 4,
              overflow: "hidden",
              transition: "all 0.3s ease", // transición suave
            }}
          >
            <Typography
              id="solicitud-modal-title"
              variant="h6"
              component="h2"
              sx={{
                mb: 2,
                textAlign: "center",
                fontWeight: "bold",
                color: "#333", // color de título
                fontSize: "1.2rem",
              }}
            >
              Gestión en proceso
            </Typography>
            <Box
              sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#666" }}
              >
                <strong>Días solicitados:</strong>{" "}
                {solicitud?.cantidadDiasSolicitados || "Sin Datos"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#666" }}
              >
                <strong>Fecha inicio vacaciones:</strong>{" "}
                {formatDateToDisplay(solicitud?.fechaInicioVacaciones) ||
                  "Sin Datos"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#666" }}
              >
                <strong>Fecha fin vacaciones:</strong>{" "}
                {formatDateToDisplay(solicitud?.fechaFinVacaciones) ||
                  "Sin Datos"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#666" }}
              >
                <strong>Fecha reintegro laboral:</strong>{" "}
                {formatDateToDisplay(solicitud?.fechaRetornoLabores) ||
                  "Sin Datos"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#666" }}
              >
                <strong>Estado:</strong>{" "}
                {renderEstado(solicitud?.estadoSolicitud || "Sin Datos")}
              </Typography>
            </Box>
            <Button
              onClick={handleCloseSolicitudModal}
              color="primary"
              variant="contained"
              sx={{
                width: "100%",
                padding: "10px 0",
                mt: 2,
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0056b3", // cambio de color en hover
                },
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>

        {/* Botón para abrir el modal de historial con indicador de carga */}
        <Button
          variant="outlined"
          color="primary"
          sx={{ display: "block", margin: "0 auto", marginTop: 2 }}
          onClick={handleOpenHistorial}
          disabled={loadingHistorial} // Deshabilitar mientras carga
        >
          {loadingHistorial ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Ver Historial"
          )}
        </Button>

        {/* Modal para mostrar el historial */}
        <Modal
          open={openHistorial}
          onClose={handleCloseHistorial}
          aria-labelledby="historial-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              left: "52%",
              transform: "translate(-50%, -50%)",
              width: 1200,
              height: 600, // Tamaño fijo para el modal
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              pt: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <InfoIcon sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>

            <IconButton
              aria-label="close"
              onClick={handleCloseHistorial}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#f44336",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              id="historial-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Historial de Vacaciones
            </Typography>

            <FormControl
              fullWidth
              variant="outlined"
              sx={{ mb: 2, width: 300 }}
            >
              <InputLabel>Seleccionar Periodo</InputLabel>
              <Select
                value={selectedPeriodo}
                onChange={handlePeriodoChange}
                label="Seleccionar Periodo"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                {Array.from(new Set(historial.map((item) => item.periodo))).map(
                  (periodo) => (
                    <MenuItem key={periodo} value={periodo}>
                      {periodo}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <TableContainer
              component={Paper}
              sx={{ maxHeight: 350, overflowY: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {[
                      "Gestion",
                      "Tipo Ingreso",
                      "Periodo",
                      "Dias Acreditados",
                      "Dias Solicitados",
                      "Dias Debitados",
                      "Dias Disponibles",
                      "Fecha Acreditacion",
                      "Fecha Debito",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        align="center"
                        sx={{
                          backgroundColor: "#424242",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHistorial.map((item) => (
                    <TableRow key={item.idHistorial}>
                      <TableCell align="center">
                        {item.tipoRegistro === 1
                          ? "CRDV" + item.Gestion
                          : "SLVC" + item.Gestion}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={item.tipoRegistro === 1 ? "Crédito" : "Débito"}
                          color={item.tipoRegistro === 1 ? "success" : "error"}
                          sx={{
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{item.periodo}</TableCell>
                      <TableCell align="center">
                        {item.totalDiasAcreditados}
                      </TableCell>
                      <TableCell align="center">
                        {item.diasSolicitados}
                      </TableCell>
                      <TableCell align="center">
                        {item.totalDiasDebitados}
                      </TableCell>
                      <TableCell align="center">
                        {item.diasDisponiblesTotales}
                      </TableCell>
                      <TableCell align="center">
                        {item.fechaAcreditacion
                          ? formatDateToDisplay(item.fechaAcreditacion)
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {item.fechaDebito
                          ? formatDateToDisplay(item.fechaDebito)
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default VacationApp;
