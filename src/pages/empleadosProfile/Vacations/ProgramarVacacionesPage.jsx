import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
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

const ProgramarVacacionesPage = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [diasVacaciones, setDiasVacaciones] = useState("0");
  const [endDate, setEndDate] = useState("");
  const [nextWorkDate, setNextWorkDate] = useState("");
  const [unidad, setUnidad] = useState("");
  const [diasHabilitado, setDiasHabilitado] = useState(false);

  const { isLoading, errorDF } = useDiasFestivos();
  const minStartDate = dayjs().add(7, "day").format("YYYY-MM-DD");
  const lastStartDate = dayjs().endOf("year").subtract(51, "day").format("YYYY-MM-DD");

  const formatDateToDisplay = (date) => dayjs(date).format("DD/MM/YYYY");

  useEffect(() => {
    const userData = getLocalStorageData();
    if (userData?.unidad) {
      setUnidad(userData.unidad);
    }
  }, []);

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!esDiaLaboral(selectedDate)) {
      alert("Por favor selecciona solo días hábiles (Lunes a Viernes).");
      setStartDate("");
      setDiasHabilitado(false);
      return;
    }
    setStartDate(selectedDate);
    setDiasVacaciones(""); // Reinicia días
    setDiasHabilitado(true); // Habilita el campo de días
    setEndDate("");
    setNextWorkDate("");
  };

  const handleDiasVacacionesChange = (e) => {
    const dias = parseInt(e.target.value, 10) || 0;
    setDiasVacaciones(dias);

    if(dias > 20){
      alert("solo puedes programar un maximo de 20 dias");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      console.log("Enviando solicitud:", { startDate, endDate, diasVacaciones });
    }
  };

  if (!isSessionVerified || !isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "80vh", backgroundColor: "#f1f3f4" }}>
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
          sx={{ fontFamily: '"Comic Sans MS", cursive', color: "#1976d2", mt: 8 }}
        >
          Programa tus vacaciones
        </Typography>

        <Paper
          component="form"
          elevation={3}
          sx={{ p: 4, width: "100%", maxWidth: "600px", mt: 2, borderRadius: "8px" }}
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
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={endDate ? formatDateToDisplay(endDate) : ""}
                inputProps={{ readOnly: true }}
                disabled={!diasHabilitado}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Fecha de reintegro"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={nextWorkDate ? formatDateToDisplay(nextWorkDate) : ""}
                inputProps={{ readOnly: true }}
                disabled={!diasHabilitado}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Unidad"
                type="text"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={unidad}
                inputProps={{ readOnly: true }}
                disabled={!diasHabilitado}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={!startDate || !diasVacaciones}
          >
            Programar vacaciones
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProgramarVacacionesPage;
