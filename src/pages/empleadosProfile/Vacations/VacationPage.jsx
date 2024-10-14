import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas"; // Para la firma
import axios from "axios"; // Para el consumo del endpoint

const VacationApp = () => {
  const isSessionVerified = useCheckSession(); // 1. Hook
  const [mobileOpen, setMobileOpen] = useState(false); // 2. Hook
  const [vacationData, setVacationData] = useState(null); // 3. Hook
  const navigate = useNavigate(); // 4. Hook
  const [signature, setSignature] = useState(null); // 5. Hook

  // Referencia para el recuadro de firma
  const signatureRef = React.useRef(); // 6. Hook

  // Llamar al endpoint para obtener los datos de gestión de vacaciones
  useEffect(() => {
    const fetchVacationData = async () => {
      try {
        const response = await axios.get("/api/vacation-data"); // Modifica el endpoint según tu API
        setVacationData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de vacaciones:", error);
      }
    };
    fetchVacationData();
  }, []); // 7. Hook

  if (!isSessionVerified) {
    return <Spinner />;
  }

  const handleSaveSignature = async () => {
    if (signatureRef.current) {
      const signatureDataURL = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");
      setSignature(signatureDataURL);
  
      // Crear un nuevo canvas para redimensionar la imagen
      const img = new Image();
      img.src = signatureDataURL;
  
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Establecer el nuevo tamaño (ajusta el ancho y alto según tus necesidades)
        const MAX_WIDTH = 800; // ancho máximo
        const MAX_HEIGHT = 600; // altura máxima
        let width = img.width;
        let height = img.height;
  
        // Redimensionar la imagen manteniendo la proporción
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
  
        // Ajustar el tamaño del canvas
        canvas.width = width;
        canvas.height = height;
  
        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, width, height);
  
        // Obtener la imagen en base64 del canvas redimensionado
        const optimizedSignatureDataURL = canvas.toDataURL("image/png");
  
        // Enviar la firma optimizada al endpoint
        try {
          await axios.post("http://localhost:3000/api/guardarFirmaDigital", {
            firma: optimizedSignatureDataURL,
          });
          alert("Firma guardada exitosamente");
        } catch (error) {
          console.error("Error al guardar la firma:", error);
          alert("Error al guardar la firma");
        }
      };
    }
  };
  

  // Redirigir a la programación de vacaciones
  const handleProgramar = () => {
    navigate("/empleados/programar-fecha");
  };

  return (
    <Box sx={{ display: "flex", height: "80vh", backgroundColor: "#f1f3f4" }}>
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

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "100px" } }}>
        <Typography
          variant="h4"
          sx={{ mb: 2, fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}
        >
          CONTROL DE VACACIONES.
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 3, fontFamily: "'Roboto', sans-serif" }}
        >
          Proceso de planificación anual
        </Typography>

        {/* Tabla de Gestión de Vacaciones */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table aria-label="vacation table">
            <TableHead>
              <TableRow>
                <TableCell>Id Gestión</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado Actual</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vacationData ? (
                <TableRow>
                  <TableCell>{vacationData.idGestion}</TableCell>
                  <TableCell>{vacationData.descripcion}</TableCell>
                  <TableCell>{vacationData.estadoActual}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleProgramar}
                    >
                      Programar
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Alert severity="info">
                      Cargando datos de vacaciones...
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
};

export default VacationApp;
