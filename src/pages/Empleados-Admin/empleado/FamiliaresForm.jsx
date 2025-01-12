import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ProgressBar from "../../../components/progresBar/ProgresBar";
import { useNavigate } from "react-router-dom";
import { useCheckSession } from "../../../services/session/checkSession";
import Spinner from "../../../components/spinners/spinner";
import { API_URL } from "../../../config/enviroment";

function FamiliaresForm() {
  const isSessionVerified = useCheckSession();


  const [activeStep, setActiveStep] = useState(2);
  const [familiares, setFamiliares] = useState([
    { nombreFamiliar: "", telefono: "", parentesco: "", fechaNacimiento: "" },
  ]);
  const [idInfoPersonal, setIdInfoPersonal] = useState(null);
  const [parentescos, setParentescos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("datosEmpleado");
    if (storedData) {
      const datosEmpleado = JSON.parse(storedData);
      setIdInfoPersonal(datosEmpleado.idInfoPersonal);
    }

    const fetchParentescos = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/parentesco`
        );
        setParentescos(response.data.departamentos);
      } catch (error) {
        console.error("Error al obtener los parentescos:", error);
        setError("Error al obtener los parentescos.");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };

    fetchParentescos();
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const nuevosFamiliares = [...familiares];
    nuevosFamiliares[index][name] = value;
    setFamiliares(nuevosFamiliares);
  };

  const addFamiliar = () => {
    setFamiliares([
      ...familiares,
      { nombreFamiliar: "", telefono: "", parentesco: "", fechaNacimiento: "" },
    ]);
  };

  const removeFamiliar = (index) => {
    const nuevosFamiliares = [...familiares];
    nuevosFamiliares.splice(index, 1);
    setFamiliares(nuevosFamiliares);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    if (idInfoPersonal) {
      try {
        for (const familiar of familiares) {
          const payload = {
            idInfoPersonal: idInfoPersonal,
            ...familiar,
          };
          const response = await axios.post(
             `${API_URL}/ingresarFamiliar`,
            payload
          );
          console.log("Familiar guardado:", response.data);
        }
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        setFamiliares([
          {
            nombreFamiliar: "",
            telefono: "",
            parentesco: "",
            fechaNacimiento: "",
          },
        ]);
      } catch (error) {
        console.error(
          "Hubo un error al guardar los familiares:",
          error.response.data.responseData
        );
        setError(
          "Hubo un error al guardar los familiares. Por favor intenta de nuevo."
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
      } finally {
        setLoading(false);
      }
    } else {
      setError(
        "No se pudo obtener el ID de información personal del local storage."
      );
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleNext = () => {
    navigate("/nivel-educativo");
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
        Familiares
      </Typography>
      {alertVisible && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Familiares guardados exitosamente.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {familiares.map((familiar, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Familiar {index + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombreFamiliar"
                  value={familiar.nombreFamiliar}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={familiar.telefono}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Parentesco</InputLabel>
                  <Select
                    fullWidth
                    label="Parentesco"
                    name="parentesco"
                    value={familiar.parentesco}
                    onChange={(e) => handleChange(index, e)}
                  >
                    {parentescos.map((parentesco) => (
                      <MenuItem
                        key={parentesco.idParentesco}
                        value={parentesco.parentesco}
                      >
                        {parentesco.parentesco}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  InputLabelProps={{ shrink: true }}
                  value={familiar.fechaNacimiento}
                  onChange={(e) => handleChange(index, e)}
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  color="secondary"
                  onClick={() => removeFamiliar(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addFamiliar}
            startIcon={<AddCircleIcon />}
          >
            Agregar Familiar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 3,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleNext}>
          Siguiente
        </Button>
      </Box>
    </Container>
  );
}

export default FamiliaresForm;
