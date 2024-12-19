import React from "react";
import { Container, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PeopleIcon from "@mui/icons-material/People";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EventIcon from "@mui/icons-material/Event";
import Navbar from "../../../components/navBar/NavBar.jsx";
import PanelCard from "../../../components/card/cardPanel.jsx";
import { useCheckSession } from "../../../services/session/checkSession.js";
import Spinner from "../../../components/spinners/spinner.jsx";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData.js";
import { useRedirectLogin, useRedirectPage } from "../../../hooks/LoginHooks/RedirectLoginHook.js";

export default function ControlPanel() {
  const isSessionVerified = useCheckSession();
  const userData = getLocalStorageData();
  useRedirectPage(userData);

  if (!isSessionVerified) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5, mb: 6 }}>
        <Grid container spacing={3}>
          {/* Condicionales según el rol del usuario */}
          {userData.idRol === 3 && (
            <Grid item xs={12} sm={6} md={4}>
              <PanelCard
                primaryText="Ingresar Empleados"
                secondaryText="Ingresar Empleados nuevos"
                icon={<SaveIcon sx={{ color: "#fff" }} />}
                backgroundColor="#2196f3"
                textColor="#fff"
                to="/ingresar-nuevo-empleado"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <PanelCard
              primaryText="Informe de Empleados"
              secondaryText="Empleados que fueron ingresados"
              icon={<PeopleIcon sx={{ color: "#fff" }} />}
              backgroundColor="#9074cb"
              textColor="#fff"
              to="/lista-de-empleados"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PanelCard
              primaryText="Reporte de vacaciones"
              secondaryText="Lista de empleados con vacaciones programadas."
              icon={<BeachAccessIcon sx={{ color: "#fff" }} />}
              backgroundColor="#4caf50"
              textColor="#fff"
              to="/vacaciones-empleados"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PanelCard
              primaryText="Suspensiones"
              secondaryText="Realizar suspensión laboral."
              icon={<EventIcon sx={{ color: "#fff" }} />}
              backgroundColor="#cb2570"
              textColor="#fff"
              to="/employee-profile"
            />
          </Grid>
          {userData.idRol === 1 && (
            <Grid item xs={12} sm={6} md={4}>
              <PanelCard
                primaryText="Usuarios RRHH"
                secondaryText="Crear usuarios de RRHH."
                icon={<EventIcon sx={{ color: "#fff" }} />}
                backgroundColor="#cb2570"
                textColor="#fff"
                to="/crear-usuarios-rrhh"
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
