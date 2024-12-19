import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import ProgressBar from "../../../components/progresBar/ProgresBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DatosGeneralesForm() {
  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];
  const [activeStep, setActiveStep] = useState(4);

  const [idInfoPersonal, setIdInfoPersonal] = useState(null);
  const [discapacidad, setDiscapacidad] = useState("");
  const [tipoDiscapacidad, setTipoDiscapacidad] = useState("");
  const [tiposDiscapacidad, setTiposDiscapacidad] = useState([]);
  const [tipoSangre, setTipoSangre] = useState("");
  const [condicionMedica, setCondicionMedica] = useState("");
  const [tomaMedicina, setTomaMedicina] = useState("");
  const [nombreMedicamento, setNombreMedicamento] = useState("");
  const [sufreAlergia, setSufreAlergia] = useState("");

  const [etnia, setEtnia] = useState("");
  const [comunidadLinguistica, setComunidadLinguistica] = useState("");
  const [etnias, setEtnias] = useState([]);
  const [comunidadesLinguisticas, setComunidadesLinguisticas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("datosEmpleado");
    if (storedData) {
      const datosEmpleado = JSON.parse(storedData);
      setIdInfoPersonal(datosEmpleado.idInfoPersonal);
    }

    const fetchDiscapacidades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/discapacidades"
        );
        setTiposDiscapacidad(response.data.discapacidades);
      } catch (error) {
        console.error("Error al obtener los tipos de discapacidad:", error);
      }
    };

    const fetchEtnias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/puebloPerteneciente"
        );
        setEtnias(response.data.etnias);
      } catch (error) {
        console.error("Error al obtener las etnias:", error);
      }
    };

    const fetchComunidadesLinguisticas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/comunidadLinguistica"
        );
        setComunidadesLinguisticas(response.data.comunidadesLinguisticas);
      } catch (error) {
        console.error("Error al obtener las comunidades lingüísticas:", error);
      }
    };

    fetchDiscapacidades();
    fetchEtnias();
    fetchComunidadesLinguisticas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const datosMedicosPayload = {
        idInfoPersonal,
        discapacidad,
        tipoDiscapacidad: discapacidad === "Sí" ? tipoDiscapacidad : null,
        tipoSangre,
        condicionMedica,
        tomaMedicina,
        nombreMedicamento: tomaMedicina === "Sí" ? nombreMedicamento : null,
        sufreAlergia,
      };

      const datosMedicosResponse = await axios.post(
        "http://localhost:3000/api/ingresarDatosMedicos",
        datosMedicosPayload
      );

      if (datosMedicosResponse.status === 200) {
        const datosSociolinguisticosPayload = {
          idInfoPersonal,
          etnia,
          comunidadLinguistica,
        };

        const datosSociolinguisticosResponse = await axios.post(
          "http://localhost:3000/api/ingresarPertenenciaSoLi",
          datosSociolinguisticosPayload
        );

        if (datosSociolinguisticosResponse.status === 200) {
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            navigate("/nuevo-empleado");
          }, 1000);
        }
      }
    } catch (error) {
      setError(
        "Hubo un error al guardar los datos. Por favor intenta de nuevo."
      );
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 10 }}>
      <Box>
        <ProgressBar
          totalSteps={steps.length}
          activeStep={activeStep}
          steps={steps}
          size="sm"
        />
      </Box>
      <Typography variant="h4" gutterBottom align="center">
        Datos Generales
      </Typography>
      <Box sx={{ width: "100%", padding: "2rem 0" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Datos Médicos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth required>
                <FormLabel component="legend">
                  Empleado con discapacidad?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="discapacidad"
                  name="discapacidad"
                  value={discapacidad}
                  onChange={(e) => setDiscapacidad(e.target.value)}
                >
                  <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {discapacidad === "Sí" && (
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="tipoDiscapacidad-label">
                    Tipo de Discapacidad
                  </InputLabel>
                  <Select
                    labelId="tipoDiscapacidad-label"
                    id="tipoDiscapacidad"
                    value={tipoDiscapacidad}
                    label="Tipo de Discapacidad"
                    onChange={(e) => setTipoDiscapacidad(e.target.value)}
                  >
                    {tiposDiscapacidad.map((tipo) => (
                      <MenuItem
                        key={tipo.idDiscapacidad}
                        value={tipo.tipoDiscapacidad}
                      >
                        {tipo.tipoDiscapacidad}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="tipoSangre-label">Tipo de Sangre</InputLabel>
                <Select
                  labelId="tipoSangre-label"
                  id="tipoSangre"
                  value={tipoSangre}
                  label="Tipo de Sangre"
                  onChange={(e) => setTipoSangre(e.target.value)}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="condicionMedica"
                label="Condición Médica"
                value={condicionMedica}
                onChange={(e) => setCondicionMedica(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth required>
                <FormLabel component="legend">
                  ¿Empleado Toma alguna medicina?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="tomaMedicina"
                  name="tomaMedicina"
                  value={tomaMedicina}
                  onChange={(e) => setTomaMedicina(e.target.value)}
                >
                  <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {tomaMedicina === "Sí" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="nombreMedicamento"
                  label="Nombre del Medicamento"
                  value={nombreMedicamento}
                  onChange={(e) => setNombreMedicamento(e.target.value)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth required>
                <FormLabel component="legend">
                  ¿Empleado sufre de alguna alergia?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="sufreAlergia"
                  name="sufreAlergia"
                  value={sufreAlergia}
                  onChange={(e) => setSufreAlergia(e.target.value)}
                >
                  <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Datos Sociolingüísticos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="etnia-label">
                  Pueblo al que pertenece
                </InputLabel>
                <Select
                  labelId="etnia-label"
                  id="etnia"
                  value={etnia}
                  label="Pueblo al que pertenece"
                  onChange={(e) => setEtnia(e.target.value)}
                >
                  {etnias.map((etnia) => (
                    <MenuItem
                      key={etnia.idPuebloPerteneciente}
                      value={etnia.pueblo}
                    >
                      {etnia.pueblo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth required>
                <InputLabel id="comunidadLinguistica-label">
                  Comunidad Lingüística
                </InputLabel>
                <Select
                  labelId="comunidadLinguistica-label"
                  id="comunidadLinguistica"
                  value={comunidadLinguistica}
                  label="Comunidad Lingüística"
                  onChange={(e) => setComunidadLinguistica(e.target.value)}
                >
                  {comunidadesLinguisticas.map((comunidad) => (
                    <MenuItem
                      key={comunidad.idComunidadLinguistica}
                      value={comunidad.tipoComunidad}
                    >
                      {comunidad.tipoComunidad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {alertVisible && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Datos guardados con éxito.
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box mt={4} display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Guardar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default DatosGeneralesForm;
