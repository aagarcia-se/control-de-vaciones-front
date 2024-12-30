import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../components/progresBar/ProgresBar";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import { useRedirectPage } from "../../../hooks/LoginHooks/RedirectLoginHook";
import { useCheckSession } from "../../../services/session/checkSession";
import Spinner from "../../../components/spinners/spinner";

const PersonalInfoForm = () => {
  const isSessionVerified = useCheckSession();
  const userData = getLocalStorageData();
  useRedirectPage(userData);

  // Setear datos del formulario
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [tercerNombre, setTercerNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [apellidoCasada, setApellidoCasada] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [direccionResidencia, setDireccionResidencia] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("");
  const [departamentoNacimiento, setDepartamentoNacimiento] = useState("");
  const [municipioNacimiento, setMunicipioNacimiento] = useState("");
  const [nit, setNit] = useState("");
  const [numAfiliacionIgss, setNumAfiliacionIgss] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [numeroLicencia, setNumeroLicencia] = useState("");
  const [tipoLicencia, setTipoLicencia] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
  const [idDpi, setIdDpi] = useState(null);

  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener la lista de departamentos desde el servidor
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/departamentos"
        );
        setDepartamentos(response.data.departamentos);
      } catch (error) {
        console.error("Error al obtener la lista de departamentos:", error);
      }
    };

    // Función para obtener la lista de municipios desde el servidor
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/municipios"
        );
        setMunicipios(response.data.municipios);
      } catch (error) {
        console.error("Error al obtener la lista de municipios:", error);
      }
    };

    // Llamar a las funciones para obtener la lista de departamentos y municipios cuando se monte el componente
    fetchDepartamentos();
    fetchMunicipios();

    // Obtener el ID de DPI del almacenamiento local
    const storedData = localStorage.getItem("datosEmpleado");
    if (storedData) {
      const datosEmpleado = JSON.parse(storedData);
      setIdDpi(datosEmpleado.idDpi);
    }
  }, []);

  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];

  const handleDepartamentoChange = (event) => {
    const departamentoId = event.target.value;
    setDepartamentoNacimiento(departamentoId);

    // Filtrar municipios basados en el departamento seleccionado
    const minId = departamentoId * 100;
    const maxId = (departamentoId + 1) * 100;
    const filteredMunicipios = municipios.filter(
      (municipio) =>
        municipio.idMunicipio >= minId && municipio.idMunicipio < maxId
    );
    setMunicipiosFiltrados(filteredMunicipios);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Enviar la información al servidor
      const data = await axios.post(
        "http://localhost:3000/api/infoPersonalEmpleado",
        {
          primerNombre,
          segundoNombre,
          tercerNombre,
          primerApellido,
          segundoApellido,
          apellidoCasada,
          numeroCelular,
          correoPersonal,
          direccionResidencia,
          estadoCivil,
          genero,
          departamentoNacimiento,
          municipioNacimiento,
          nit,
          numAfiliacionIgss,
          fechaNacimiento,
          numeroLicencia,
          tipoLicencia,
          idDpi, // Agregar el ID de DPI al payload
        }
      );
      if (data.status === 200) {
        const idInfoPersonal = data.data.responseData.idInfoPersonal;
        const storedData = localStorage.getItem("datosEmpleado");
        if (storedData) {
          const datosEmpleado = JSON.parse(storedData);
          datosEmpleado.idInfoPersonal = idInfoPersonal;
          localStorage.setItem("datosEmpleado", JSON.stringify(datosEmpleado));
        }

        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/familiares");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al enviar la información personal:", error);
      setError(
        "Hubo un error al guardar la información personal. Por favor intenta de nuevo."
      );
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
    <Container maxWidth="lg">
      <Box>
        <Box sx={{ mx: "auto" }} maxWidth="xs">
          <ProgressBar
            totalSteps={steps.length}
            activeStep={activeStep}
            steps={steps}
            size="sm"
          />
        </Box>
        <Typography variant="h4" gutterBottom align="center">
          Información Personal
        </Typography>
        {alertVisible && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Información personal guardada con éxito.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="primerNombre"
                label="Primer Nombre"
                value={primerNombre}
                autoFocus
                onChange={(e) => setPrimerNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="segundoNombre"
                label="Segundo Nombre"
                value={segundoNombre}
                onChange={(e) => setSegundoNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="tercerNombre"
                label="Tercer Nombre"
                value={tercerNombre}
                onChange={(e) => setTercerNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="primerApellido"
                label="Primer Apellido"
                value={primerApellido}
                onChange={(e) => setPrimerApellido(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="segundoApellido"
                label="Segundo Apellido"
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="apellidoCasada"
                label="Apellido de Casada"
                value={apellidoCasada}
                onChange={(e) => setApellidoCasada(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="numeroCelular"
                label="Número de Celular"
                value={numeroCelular}
                onChange={(e) => setNumeroCelular(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="correoPersonal"
                label="Correo Personal"
                type="email"
                value={correoPersonal}
                onChange={(e) => setCorreoPersonal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="direccionResidencia"
                label="Dirección de Residencia"
                value={direccionResidencia}
                onChange={(e) => setDireccionResidencia(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel id="estadoCivil-label">Estado Civil</InputLabel>
                <Select
                  labelId="estadoCivil-label"
                  id="estadoCivil"
                  value={estadoCivil}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                >
                  <MenuItem value={"Soltero"}>Soltero</MenuItem>
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Viudo"}>Viudo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel id="genero-label">Género</InputLabel>
                <Select
                  labelId="genero-label"
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Femenino"}>Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel id="departamentoNacimiento-label">
                  Departamento de Nacimiento
                </InputLabel>
                <Select
                  labelId="departamentoNacimiento-label"
                  id="departamentoNacimiento"
                  value={departamentoNacimiento}
                  onChange={handleDepartamentoChange}
                >
                  {departamentos.map((departamento) => (
                    <MenuItem
                      key={departamento.idDepartamento}
                      value={departamento.idDepartamento}
                    >
                      {departamento.departamento}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel id="municipioNacimiento-label">
                  Municipio de Nacimiento
                </InputLabel>
                <Select
                  labelId="municipioNacimiento-label"
                  id="municipioNacimiento"
                  value={municipioNacimiento}
                  onChange={(e) => setMunicipioNacimiento(e.target.value)}
                  disabled={!departamentoNacimiento} // Deshabilitar si no hay departamento seleccionado
                >
                  {municipiosFiltrados.map((municipio) => (
                    <MenuItem
                      key={municipio.idMunicipio}
                      value={municipio.idMunicipio}
                    >
                      {municipio.municipio}
                    </MenuItem>
                  ))}
                </Select>
                {!departamentoNacimiento && (
                  <Typography variant="caption" color="error">
                    Por favor, seleccione primero un departamento.
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="nit"
                label="NIT"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="numAfiliacionIgss"
                label="Número de Afiliación IGSS"
                value={numAfiliacionIgss}
                onChange={(e) => setNumAfiliacionIgss(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="fechaNacimiento"
                label="Fecha de Nacimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="numeroLicencia"
                label="Número de Licencia"
                value={numeroLicencia}
                onChange={(e) => setNumeroLicencia(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="tipoLicencia-label">
                  Tipo de Licencia
                </InputLabel>
                <Select
                  labelId="tipoLicencia-label"
                  id="tipoLicencia"
                  value={tipoLicencia}
                  onChange={(e) => setTipoLicencia(e.target.value)}
                >
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"M"}>M</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, mb: 3 }}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Siguiente"}
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PersonalInfoForm;
