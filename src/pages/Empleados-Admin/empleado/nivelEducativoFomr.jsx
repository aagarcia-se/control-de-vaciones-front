import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/progresBar/ProgresBar";
import { useCheckSession } from "../../../services/session/checkSession";
import Spinner from "../../../components/spinners/spinner";
import { API_URL } from "../../../config/enviroment";

function NivelEducativoForm() {
    const isSessionVerified = useCheckSession();
  

  // Pasos para el ProgressBar
  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];

  // Paso Activo
  const [activeStep, setActiveStep] = useState(3);

  // Estados del formulario
  const [idInfoPersonal, setIdInfoPersonal] = useState(null);
  const [nivelDeEstudios, setNivelDeEstudios] = useState("");
  const [ultimoNivelAlcanzado, setUltimoNivelAlcanzado] = useState("");
  const [añoUltimoNivelCursado, setAñoUltimoNivelCursado] = useState("");
  const [profesion, setProfesion] = useState("");
  const [numeroColegiado, setNumeroColegiado] = useState("");
  const [fechaColegiacion, setFechaColegiacion] = useState("");
  const [nivelesEducativos, setNivelesEducativos] = useState([]);

  // Estados para el loader y alertas
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener idInfoPersonal de localStorage
    const storedData = localStorage.getItem("datosEmpleado");
    if (storedData) {
      const datosEmpleado = JSON.parse(storedData);
      setIdInfoPersonal(datosEmpleado.idInfoPersonal);
    }

    // Obtener los niveles educativos del servidor
    const fetchNivelesEducativos = async () => {
      try {
        const response = await axios.get(`${API_URL}/nivelEducativo`);
        setNivelesEducativos(response.data.nivelEducativo);
      } catch (error) {
        console.error("Error al obtener los niveles educativos:", error);
      }
    };

    fetchNivelesEducativos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const fechaColegiacionToSend = fechaColegiacion === "" ? null : fechaColegiacion;
    try {
      const payload = {
        idInfoPersonal,
        nivelDeEstudios,
        ultimoNivelAlcanzado,
        añoUltimoNivelCursado,
        profesion,
        numeroColegiado,
        fechaColegiacionToSend,
      };

      const response = await axios.post(
        `${API_URL}/ingresarNivelEducativo`,
        payload
      );

      if (response.status === 200) {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/datos-generales");
        }, 1000);
      }
    } catch (error) {
      setError("Hubo un error al guardar la información del nivel educativo. Por favor intenta de nuevo.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!isSessionVerified) {
    return <Spinner />; // Muestra el spinner mientras se está verificando la sesión
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <ProgressBar
          totalSteps={steps.length}
          activeStep={activeStep}
          steps={steps}
          size="sm"
        />
      </Box>
      <Typography variant="h4" gutterBottom align="center">
        Nivel Educativo
      </Typography>
      <Box sx={{ width: "100%", padding: "2rem 0", marginRight: "2rem" }}>
        {alertVisible && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Información del nivel educativo guardada con éxito.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="nivelDeEstudios-label">Nivel de Estudios</InputLabel>
                <Select
                  labelId="nivelDeEstudios-label"
                  id="nivelDeEstudios"
                  value={nivelDeEstudios}
                  label="Nivel de Estudios"
                  onChange={(e) => setNivelDeEstudios(e.target.value)}
                >
                  {nivelesEducativos.map((nivel) => (
                    <MenuItem key={nivel.idNivelEducativo} value={nivel.nivelEducativo}>
                      {nivel.nivelEducativo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="ultimoNivelAlcanzado"
                label="Último Nivel Alcanzado"
                value={ultimoNivelAlcanzado}
                onChange={(e) => setUltimoNivelAlcanzado(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="añoUltimoNivelCursado"
                label="Año Último Nivel Cursado"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={añoUltimoNivelCursado}
                onChange={(e) => setAñoUltimoNivelCursado(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="profesion"
                label="Profesión"
                value={profesion}
                onChange={(e) => setProfesion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="numeroColegiado"
                label="Número de Colegiado"
                value={numeroColegiado}
                onChange={(e) => setNumeroColegiado(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="fechaColegiacion"
                label="Fecha de Colegiación"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={fechaColegiacion}
                onChange={(e) => setFechaColegiacion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button type="submit" variant="contained" size="small" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Siguiente"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default NivelEducativoForm;
