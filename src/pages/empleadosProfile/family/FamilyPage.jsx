import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Card, CardContent, Typography, Avatar, Button, Modal, TextField } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";
import { useInfoFamiliares } from "../../../hooks/EmpleadosHooks/useInfoFamiliares";
import { useErrorAlert } from "../../../hooks/LoginHooks/useErrorAlert";
import ErrorAlert from "../../../components/ErrorAlert/ErrorAlert";

const familiaresEjemplo = [
  { idFamiliar: 1, nombreFamiliar: "Julian Alvarez", telefono: "57895496", parentesco: "Hermano (a)", fechaNacimiento: "1997-05-12" },
  { idFamiliar: 2, nombreFamiliar: "Ana Maria Perez", telefono: "56873213", parentesco: "Madre", fechaNacimiento: "1972-11-24" },
  { idFamiliar: 3, nombreFamiliar: "Carlos Perez", telefono: "55879321", parentesco: "Padre", fechaNacimiento: "1970-08-14" }
];

const FamilyPage = () => {
  const isSessionVerified = useCheckSession();
  const { familiares, error, loading } = useInfoFamiliares();
  const { alertVisible } = useErrorAlert(error);

  const [mobileOpen, setMobileOpen] = useState(false);
  //const [familiares, setFamiliares] = useState(familiaresEjemplo);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoFamiliar, setNuevoFamiliar] = useState({
    nombreFamiliar: "",
    telefono: "",
    parentesco: "",
    fechaNacimiento: ""
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setNuevoFamiliar({ ...nuevoFamiliar, [e.target.name]: e.target.value });
  };

  const handleAddFamiliar = () => {
    setFamiliares([...familiares, { ...nuevoFamiliar, idFamiliar: familiares.length + 1 }]);
    handleCloseModal();
  };



  if (!isSessionVerified) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
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
          width: { xs: mobileOpen ? "240px" : 0, md: "240px" },
          flexShrink: { md: 0 },
          overflowY: "auto",
          transition: "width 0.3s",
          borderRight: { md: "1px solid #ddd" },
          position: { xs: "absolute", md: "relative" },
          zIndex: 1200,
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: { md: "100px" }, backgroundColor: "#f9fafc", mt:2 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4, color: "#09098a" }}>
          Familiares
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          sx={{ mb: 3 }}
          onClick={handleOpenModal}
        >
          Añadir Familiar
        </Button>

        <Grid container spacing={3} >
          {!error ? (
            familiares.map((familiar) => (
              <Grid item xs={12} sm={6} md={4} key={familiar.idFamiliar} sx={{  marginBottom: "40px" }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Avatar sx={{ width: 56, height: 56, backgroundColor: "#096f83" }}>
                    <GroupIcon />
                  </Avatar>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#020024" }}>
                      {familiar.nombreFamiliar}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <PhoneIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="textSecondary" ml={1}>
                        {familiar.telefono}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <GroupIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="textSecondary" ml={1}>
                        {familiar.parentesco}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <CalendarTodayIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="textSecondary" ml={1}>
                        {new Date(familiar.fechaNacimiento).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid sx={{mt: 3}}>
            <ErrorAlert message={error} visible={alertVisible} />;
            </Grid>
          )}
        </Grid>

        {/* Modal para añadir familiares */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 2 }} />
            <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
              Añadir Familiar
            </Typography>
            <TextField
              label="Nombre del Familiar"
              fullWidth
              margin="normal"
              name="nombreFamiliar"
              value={nuevoFamiliar.nombreFamiliar}
              onChange={handleChange}
            />
            <TextField
              label="Teléfono"
              fullWidth
              margin="normal"
              name="telefono"
              value={nuevoFamiliar.telefono}
              onChange={handleChange}
            />
            <TextField
              label="Parentesco"
              fullWidth
              margin="normal"
              name="parentesco"
              value={nuevoFamiliar.parentesco}
              onChange={handleChange}
            />
            <TextField
              label="Fecha de Nacimiento"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              name="fechaNacimiento"
              value={nuevoFamiliar.fechaNacimiento}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleAddFamiliar}
              sx={{ mt: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default FamilyPage;
