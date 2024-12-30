import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ProgressBar from "../../../components/progresBar/ProgresBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCheckSession } from "../../../services/session/checkSession";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import { useRedirectPage } from "../../../hooks/LoginHooks/RedirectLoginHook";

function EmpleadoForm() {
    const isSessionVerified = useCheckSession();
    const userData = getLocalStorageData();
    useRedirectPage(userData);

  const steps = [
    "DPI",
    "Datos Personales",
    "Datos Familiares",
    "Nivel Educativo",
    "Datos Generales",
    "Empleado Nuevo",
  ];
  const [activeStep, setActiveStep] = useState(5);

  const [idInfoPersonal, setIdInfoPersonal] = useState(null);
  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [correoInstitucional, setCorreoInstitucional] = useState("");
  const [extensionTelefonica, setExtensionTelefonica] = useState("");
  const [unidad, setUnidad] = useState("");
  const [renglon, setRenglon] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [coordinacion, setCoordinacion] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [numeroCuentaCHN, setNumeroCuentaCHN] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [numeroActa, setNumeroActa] = useState("");
  const [numeroAcuerdo, setNumeroAcuerdo] = useState("");

  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

  const [puestos, setPuestos] = useState([]);
  const [renglones, setRenglones] = useState([]);
  const [unidades, setUnidades] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("datosEmpleado");
    if (storedData) {
      const datosEmpleado = JSON.parse(storedData);
      setIdInfoPersonal(datosEmpleado.idInfoPersonal);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [puestosRes, renglonesRes, unidadesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/puestos"),
          axios.get("http://localhost:3000/api/renglonesPresupuestarios"),
          axios.get("http://localhost:3000/api/unidades"),
        ]);

        setPuestos(puestosRes.data.departamentos.filter(d => d.estado === "A"));
        setRenglones(renglonesRes.data.departamentos.filter(d => d.estado === "A"));
        setUnidades(unidadesRes.data.departamentos.filter(d => d.estado === "A"));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Hubo un error al cargar los datos. Por favor intenta de nuevo.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const empleadoPayload = {
        idInfoPersonal,
        puesto,
        salario,
        fechaIngreso,
        correoInstitucional,
        extensionTelefonica,
        unidad,
        renglon,
        observaciones,
        coordinacion,
        tipoContrato,
        numeroCuentaCHN,
        numeroContrato,
        numeroActa,
        numeroAcuerdo,
      };

      const response = await axios.post(
        "http://localhost:3000/api/ingresarEmpleado",
        empleadoPayload
      );

      if (response.status === 200) {
        localStorage.removeItem('datosEmpleado');
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/panel");
        }, 1000);
      }
    } catch (error) {
      setError("Hubo un error al guardar los datos. Por favor intenta de nuevo.");
      console.error(error);
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
        Empleado
      </Typography>
      <Box sx={{ width: "100%", padding: "2rem 0" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="puesto-label">Puesto</InputLabel>
                <Select
                  labelId="puesto-label"
                  id="puesto"
                  value={puesto}
                  onChange={(e) => setPuesto(e.target.value)}
                  label="Puesto"
                >
                  {puestos.map((p) => (
                    <MenuItem key={p.idPuesto} value={p.puesto}>
                      {p.puesto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="salario"
                label="Salario"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="fechaIngreso"
                label="Fecha de Ingreso"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="correoInstitucional"
                label="Correo Institucional"
                value={correoInstitucional}
                onChange={(e) => setCorreoInstitucional(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="extensionTelefonica"
                label="Extensión Telefónica"
                value={extensionTelefonica}
                onChange={(e) => setExtensionTelefonica(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="unidad-label">Unidad</InputLabel>
                <Select
                  labelId="unidad-label"
                  id="unidad"
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                  label="Unidad"
                >
                  {unidades.map((u) => (
                    <MenuItem key={u.idUnidad} value={u.nombreUnidad}>
                      {u.nombreUnidad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="renglon-label">Renglón</InputLabel>
                <Select
                  labelId="renglon-label"
                  id="renglon"
                  value={renglon}
                  onChange={(e) => setRenglon(e.target.value)}
                  label="Renglón"
                >
                  {renglones.map((r) => (
                    <MenuItem key={r.idRenglonPresupuestario} value={r.renglon}>
                      {r.descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="observaciones"
                label="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="coordinacion"
                label="Coordinación"
                value={coordinacion}
                onChange={(e) => setCoordinacion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="tipoContrato-label">Tipo de Contrato</InputLabel>
                <Select
                  labelId="tipoContrato-label"
                  id="tipoContrato"
                  value={tipoContrato}
                  onChange={(e) => setTipoContrato(e.target.value)}
                  label="Tipo de Contrato"
                >
                  <MenuItem value="Permanente">Permanente</MenuItem>
                  <MenuItem value="Temporal">Temporal</MenuItem>
                  <MenuItem value="Consultor">Consultor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="numeroCuentaCHN"
                label="Número de Cuenta CHN"
                value={numeroCuentaCHN}
                onChange={(e) => setNumeroCuentaCHN(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="numeroContrato"
                label="Número de Contrato"
                value={numeroContrato}
                onChange={(e) => setNumeroContrato(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="numeroActa"
                label="Número de Acta"
                value={numeroActa}
                onChange={(e) => setNumeroActa(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="numeroAcuerdo"
                label="Número de Acuerdo"
                value={numeroAcuerdo}
                onChange={(e) => setNumeroAcuerdo(e.target.value)}
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {alertVisible && (
              <Grid item xs={12}>
                <Alert severity="success">Datos guardados con éxito.</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default EmpleadoForm;
