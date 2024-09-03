import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import SearchBar from "../../../components/EmpleadosPage/SerchBar/SerchBar";
import ContactProfile from "../../../components/EmpleadosPage/ContactProfile/ContactProfile";
import ContactDetails from "../../../components/EmpleadosPage/ContactDetails/ContactDetails";
import GeneralInformation from "../../../components/EmpleadosPage/GeneralInformation/GeneralInformation";
import ActionsMenu from "../../../components/EmpleadosPage/ActionMenu/ActionMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { obtenerInformacionPeresonal } from "../../../services/InformacionPersonal/obtenerInformacion";
import Spinner from "../../../components/spinners/spinner";

const ContactsPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [informacionPersonal, setInformacionPersonal] = useState(null); // Estado para almacenar la información personal
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchInformacionPersonal = async () => {
      try {
        const idEmpleado = 1; // Reemplaza con el ID dinámico del empleado, si lo tienes
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
  }, []); // Dependencias vacías para ejecutar solo una vez al montar

  if (loading) {
    return <Spinner/>;
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
        sx={{
          width: { md: "240px" },
          flexShrink: 0,
          overflowY: "auto",
          borderRight: "1px solid #ddd",
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, margin: 0 }}>
        <Grid container spacing={2} sx={{ marginTop: 2, marginLeft: 15 }}>
          <Grid item xs={12} md={8}>
            <ContactProfile infoPersonal={informacionPersonal} />
          </Grid>
          <Grid item xs={12} md={1}>
            <ActionsMenu />
          </Grid>

          <Grid item xs={12} md={8} container spacing={3}>
            <Grid item xs={12} md={7}>
                <GeneralInformation infoPersonal={informacionPersonal}/>
            </Grid>
            <Grid item xs={10} md={5}>
              <ContactDetails infoPersonal={informacionPersonal} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactsPage;