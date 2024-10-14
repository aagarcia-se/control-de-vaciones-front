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
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";

const GeneralInfoPage = () => {
  const isSessionVerified = useCheckSession();
  const { datosMedicos, errorDM, loadingDM } = useDatoMedicos();
  const { datosSoli, errorSL, loadingSL } = usePertenenciaSoli();

  // Manejo del estado de carga y errores
  if (loadingDM || loadingSL || !isSessionVerified) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "130vh", backgroundColor: "#f4f0e8" }}>
      {/* Sidebar */}
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

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "50px" } }}>
        {errorDM ? (
          <Grid sx={{ mt: 3 }}>
            <ErrorAlert message={errorDM || errorSL} visible={true} />
          </Grid>
        ) : (
          <>
            {/* Información Médica */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Información Médica
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                      <AccessibilityNewIcon aria-label="Discapacidad" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Discapacidad</Typography>
                      <Typography>
                        {datosMedicos?.discapacidad || "N/A"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#4caf50", mr: 2 }}>
                      <AccessibilityNewIcon aria-label="Tipo de Discapacidad" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Tipo de Discapacidad</Typography>
                      <Typography>
                        {datosMedicos?.tipoDiscapacidad || "Sin Discapacidad"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#ff5722", mr: 2 }}>
                      <BloodtypeIcon aria-label="Tipo de Sangre" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Tipo de Sangre</Typography>
                      <Typography>
                        {datosMedicos?.tipoSangre || "N/A"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#9c27b0", mr: 2 }}>
                      <HealingIcon aria-label="Condición Médica" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Condición Médica</Typography>
                      <Typography>
                        {datosMedicos?.condicionMedica ||
                          "Sin Condición Médica"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#00bcd4", mr: 2 }}>
                      <MedicationIcon aria-label="Toma Medicina" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Toma Medicina</Typography>
                      <Typography>
                        {datosMedicos?.tomaMedicina || "N/A"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#ffc107", mr: 2 }}>
                      <LocalPharmacyIcon aria-label="Nombre del Medicamento" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        Nombre del Medicamento
                      </Typography>
                      <Typography>
                        {datosMedicos?.nombreMedicamento || "Sin Medicamento"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
                      <MedicalServicesIcon aria-label="Sufre Alergia" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Sufre Alergia</Typography>
                      <Typography>
                        {datosMedicos?.sufreAlergia || "N/A"}
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
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#607d8b", mr: 2 }}>
                      <PeopleIcon aria-label="Etnia" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Etnia</Typography>
                      <Typography>{datosSoli?.etnia || "N/A"}</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, display: "flex", alignItems: "center" }}
                  >
                    <Avatar sx={{ bgcolor: "#ffeb3b", mr: 2 }}>
                      <PeopleIcon aria-label="Idioma" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Idioma</Typography>
                      <Typography>{datosSoli?.idioma || "N/A"}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GeneralInfoPage;
