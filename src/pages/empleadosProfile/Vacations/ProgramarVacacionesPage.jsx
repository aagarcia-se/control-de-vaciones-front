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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import { useCheckSession } from "../../../services/session/checkSession";
import dayjs from "dayjs";
import { isHoliday, calculateBusinessDays, loadDiasFestivos } from "../../../services/utils/dates/vacationUtils.js";
import { getDiasFestivos } from "../../../services/EmpleadosServices/DiasFestivos/GetDiasFestivos.js";

const ProgramarVacacionesPage = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nextWorkDate, setNextWorkDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar los días festivos al montar el componente
    const fetchHolidays = async () => {
      await loadDiasFestivos(getDiasFestivos);
    };
    fetchHolidays();
  }, []);


  const today = dayjs().format("YYYY-MM-DD");
  
  // Límite superior de la fecha de inicio: 20 días antes del 30 de noviembre
  const lastStartDate = dayjs().endOf("year").subtract(31 + 20, "day").format("YYYY-MM-DD");
  
  // Límite superior para la fecha de fin: 30 de noviembre de cualquier año
  const lastEndDate = dayjs().endOf("year").subtract(31, "day").format("YYYY-MM-DD");

  const formatDateToDisplay = (date) => dayjs(date).format("DD/MM/YYYY");

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (dayjs(selectedDate).isAfter(lastStartDate)) {
      setError("La fecha de inicio debe ser 20 días antes del final de noviembre.");
      setStartDate("");
    } else {
      setStartDate(selectedDate);
      setError("");
      setEndDate("");
      setNextWorkDate("");
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    if (dayjs(selectedEndDate).isAfter(lastEndDate)) {
      setError("La fecha de fin no puede ser después del 30 de noviembre.");
      setEndDate("");
    } else {
      setEndDate(selectedEndDate);
      setError("");
      calculateNextWorkDate(selectedEndDate);
    }
  };

  const calculateNextWorkDate = (selectedEndDate) => {
    let nextDate = dayjs(selectedEndDate).add(1, "day");
    while (nextDate.day() === 6 || nextDate.day() === 0 || isHoliday(nextDate)) {
      nextDate = nextDate.add(1, "day");
    }
    setNextWorkDate(nextDate.format("YYYY-MM-DD"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && startDate && endDate) {
      console.log("Enviando solicitud:", { startDate, endDate });
    }
  };

  if (!isSessionVerified) {
    return <Spinner />;
  }

  const programmedDays = startDate && endDate ? calculateBusinessDays(startDate, endDate) : null;

  return (
    <Box sx={{ display: "flex", height: "80vh", backgroundColor: "#f1f3f4" }}>
      <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2, display: { md: "none" } }}>
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
          ml: { md: "100px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive', color: "#1976d2", mb: 3 }}>
          Programa tus vacaciones
        </Typography>

        <Paper component="form" elevation={3} sx={{ p: 4, width: "100%", maxWidth: "600px", mt: 2, borderRadius: "8px" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Fecha de inicio"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={handleStartDateChange}
                inputProps={{ min: today, max: lastStartDate }}
              />
              <Box sx={{ minWidth: "24px", ml: 1 }}>
                {startDate && <CheckCircleIcon sx={{ color: "green" }} />}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Fecha de fin"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={handleEndDateChange}
                inputProps={{ min: startDate, max: lastEndDate }}
                disabled={!startDate}
              />
              <Box sx={{ minWidth: "24px", ml: 1 }}>
                {endDate && <CheckCircleIcon sx={{ color: "green" }} />}
              </Box>
            </Grid>
            <Grid item xs={12}>
              {startDate && endDate && (
                <Typography variant="body1" align="center">
                  <strong>Días habilies programados:</strong> {programmedDays}
                </Typography>
              )}
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Fecha de reintegro laboral"
                  type="text"
                  fullWidth
                  value={nextWorkDate ? formatDateToDisplay(nextWorkDate) : ""}
                  inputProps={{ readOnly: true }}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ minWidth: "24px", ml: 1 }}>
                  {nextWorkDate && <CheckCircleIcon sx={{ color: "green" }} />}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={!startDate || !endDate}>
            Programar vacaciones
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProgramarVacacionesPage;
