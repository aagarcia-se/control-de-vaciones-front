import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import ContactProfile from "../../../components/EmpleadosPage/ContactProfile/ContactProfile";
import ContactDetails from "../../../components/EmpleadosPage/ContactDetails/ContactDetails";
import GeneralInformation from "../../../components/EmpleadosPage/GeneralInformation/GeneralInformation";
import ActionsMenu from "../../../components/EmpleadosPage/ActionMenu/ActionMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { obtenerInformacionPeresonal } from "../../../services/InformacionPersonal/obtenerInformacion";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";

const ContactsPage = () => {

  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [informacionPersonal, setInformacionPersonal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchInformacionPersonal = async () => {
      try {
        const userData = getLocalStorageData();
        const idEmpleado = userData.idEmpleado; // Reemplaza con el ID dinámico del empleado
        const data = await obtenerInformacionPeresonal(idEmpleado);
        setInformacionPersonal(data);
      } catch (error) {
        console.error("Error al obtener la información personal:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformacionPersonal();
  }, []);

  if (!isSessionVerified) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error al cargar la información personal.</div>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f1f3f4" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{
          width: { xs: mobileOpen ? '240px' : 0, md: '240px' },
          flexShrink: { md: 0 },
          overflowY: "auto",
          transition: 'width 0.3s',
          borderRight: { md: "1px solid #ddd" },
          position: { xs: 'absolute', md: 'relative' },
          zIndex: 1200,
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "100px" } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <ContactProfile infoPersonal={informacionPersonal} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ActionsMenu />
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} md={6}>
              <GeneralInformation infoPersonal={informacionPersonal} />
            </Grid>
            <Grid item xs={12} md={4}>
              <ContactDetails infoPersonal={informacionPersonal} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactsPage;
