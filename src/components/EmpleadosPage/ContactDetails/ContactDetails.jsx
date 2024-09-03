import React from "react";
import { Box, Typography, Link, IconButton, Paper } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

const ContactDetails = (infoPersonal) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5", // Cambia el color de fondo si deseas blanco puro con #ffffff
      }}
    >
      <Typography variant="h6" gutterBottom>
        Datos de contacto
      </Typography>

      {/* Correo Electrónico */}
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton size="small" color="primary">
          <EmailOutlinedIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {infoPersonal.infoPersonal.correoPersonal}
        </Typography>
      </Box>

      {/* Añadir número de teléfono */}
      <Box display="flex" alignItems="center" mb={1}>
        <IconButton size="small" color="primary">
          <PhoneOutlinedIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {infoPersonal.infoPersonal.numeroCelular}
        </Typography>
      </Box>

      {/* Añadir fecha de nacimiento */}
      <Box display="flex" alignItems="center">
        <IconButton size="small" color="primary">
          <CakeOutlinedIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
  {new Date(infoPersonal.infoPersonal.fechaNacimiento).toLocaleDateString('en-GB')}
</Typography>

      </Box>
    </Paper>
  );
};

export default ContactDetails;
