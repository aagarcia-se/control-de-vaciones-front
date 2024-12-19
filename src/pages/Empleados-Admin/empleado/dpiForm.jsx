import React, { useState, useEffect, useContext } from "react";
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
import Navbar from "../../../components/navBar/NavBar";
import { useCheckSession } from "../../../services/session/checkSession";
import Spinner from "../../../components/spinners/spinner";

//Formulario para ingreso de datos del documento de identificacion
function DocumentForm() {
  const isSessionVerified = useCheckSession();

  /*Setear datos del formulario */
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [departamentoExpedicion, setDepartamentoExpedicion] = useState("");
  const [municipioExpedicion, setMunicipioExpedicion] = useState("");
  const [fechaVencimientoDpi, setFechaVencimientoDpi] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  //Estados de los componentes
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

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
  }, []);

  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Enviar la información al servidor
      const data = await axios.post(
        "http://localhost:3000/api/ingresarInfDpi",
        {
          numeroDocumento,
          departamentoExpedicion,
          municipioExpedicion,
          fechaVencimientoDpi,
        }
      );
      if (data.status === 200) {
        const empleado = {
          idDpi: data.data.idDpi, // Asigna un nombre de propiedad al valor
        };

        localStorage.setItem("datosEmpleado", JSON.stringify(empleado));

        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/ingresar-infoPersonal");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.responseData);
      } else {
        setError(
          "Hubo un error al guardar la información del DPI. Por favor intenta de nuevo."
        );
      }
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
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box>
          <ProgressBar
            totalSteps={steps.length}
            activeStep={activeStep}
            steps={steps}
            size="sm"
          />
        </Box>
        <Box sx={{ width: "100%", padding: "2rem 0", marginRight: "2rem" }}>
          <Typography variant="h6" gutterBottom align="center">
            Documento de identificación
          </Typography>
          {alertVisible && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Información del DPI guardada con éxito.
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="numeroDocumento"
                  label="Número de Documento"
                  name="numeroDocumento"
                  autoComplete="off"
                  autoFocus
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="departamentoExpedicion-label">
                    Departamento de Expedición
                  </InputLabel>
                  <Select
                    labelId="departamentoExpedicion-label"
                    id="departamentoExpedicion"
                    value={departamentoExpedicion}
                    label="Departamento de Expedición"
                    onChange={(e) => setDepartamentoExpedicion(e.target.value)}
                  >
                    {departamentos.map((departamento) => (
                      <MenuItem
                        key={departamento.idDepartamento}
                        value={departamento.departamento}
                      >
                        {departamento.departamento}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="municipioExpedicion-label">
                    Municipio de Expedición
                  </InputLabel>
                  <Select
                    labelId="municipioExpedicion-label"
                    id="municipioExpedicion"
                    value={municipioExpedicion}
                    label="Municipio de Expedición"
                    onChange={(e) => setMunicipioExpedicion(e.target.value)}
                    disabled={!departamentoExpedicion}
                  >
                    {municipios.map((municipio) => (
                      <MenuItem
                        key={municipio.idMunicipio}
                        value={municipio.municipio}
                      >
                        {municipio.municipio}
                      </MenuItem>
                    ))}
                  </Select>
                  {!departamentoExpedicion && (
                    <Typography variant="caption" color="error">
                      Por favor, seleccione un departamento.
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="fechaVencimientoDpi"
                  label="Fecha de Vencimiento de DPI"
                  name="fechaVencimientoDpi"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fechaVencimientoDpi}
                  onChange={(e) => setFechaVencimientoDpi(e.target.value)}
                />
              </Grid>
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
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default DocumentForm;
