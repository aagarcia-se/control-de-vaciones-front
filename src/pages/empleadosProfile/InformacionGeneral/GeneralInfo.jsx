import React from "react";
import { Box, Typography, Grid, Paper, Divider, Avatar } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MedicationIcon from "@mui/icons-material/Medication";
import HealingIcon from "@mui/icons-material/Healing";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PeopleIcon from "@mui/icons-material/People";
import { useDatoMedicos } from "../../../hooks/EmpleadosHooks/useDatosMEdicos";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { usePertenenciaSoli } from "../../../hooks/EmpleadosHooks/usePertenenciaSoli";

const GeneralInfoPage = () => {
  const isSessionVerified = useCheckSession();
  const { datosMedicos, errorDM, loadingDM } = useDatoMedicos();
  const {datosSoli, errorSL, loadingSL} = usePertenenciaSoli();


  if (loadingDM || !isSessionVerified || loadingSL) {
    return <Spinner />;
  }

  if (errorSL || errorDM) {
    return <div>{errorSL}</div>;
  }

  return (
    <Box sx={{ display: "flex", height: "130vh", backgroundColor: "#f4f0e8" }}>
      <Box
        component="nav"
        sx={{
          width: { xs: "240px", md: "240px" },
          flexShrink: { md: 0 },
          overflowY: "auto",
          borderRight: { md: "1px solid #ddd" },
        }}
      >
        <Sidebar />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "50px" } }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Información Médica
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Información Médica */}
          <Grid container spacing={3}>
            {/* Discapacidad */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                  <AccessibilityNewIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Discapacidad</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.discapacidad
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Tipo de Discapacidad */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#4caf50", mr: 2 }}>
                  <AccessibilityNewIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Tipo de Discapacidad</Typography>
                  <Typography>
                    {datosMedicos
                      ? datosMedicos.tipoDiscapacidad ? datosMedicos.tipoDiscapacidad : "Sin Discapacidad"
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Tipo de Sangre */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#ff5722", mr: 2 }}>
                  <BloodtypeIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Tipo de Sangre</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.tipoSangre
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Condición Médica */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#9c27b0", mr: 2 }}>
                  <HealingIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Condición Médica</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.condicionMedica ? datosMedicos.condicionMedica : "Sin Condiion Medica"
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Toma Medicina */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#00bcd4", mr: 2 }}>
                  <MedicationIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Toma Medicina</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.tomaMedicina
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Nombre del Medicamento */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#ffc107", mr: 2 }}>
                  <LocalPharmacyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Nombre del Medicamento</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.nombreMedicamento ? datosMedicos.nombreMedicamento : "Sin Medicamento"
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Sufre Alergia */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
                  <MedicalServicesIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Sufre Alergia</Typography>
                  <Typography>
                  {datosMedicos
                      ? datosMedicos.sufreAlergia
                      : "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Pertenencia Sociolingüística */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Pertenencia Sociolingüística
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Etnia */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#607d8b", mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Etnia</Typography>
                  <Typography>
                  {datosSoli ?
                    datosSoli.etnia:
                    "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Comunidad Lingüística */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "#ffeb3b", mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Comunidad Lingüística</Typography>
                  <Typography>
                    {datosSoli ?
                    datosSoli.comunidadLinguistica:
                    "N/A"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default GeneralInfoPage;
