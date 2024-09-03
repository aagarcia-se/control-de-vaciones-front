import React from "react";
import { Grid, Typography, styled, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

const DetailText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  marginBottom: "8px",
  color: "#5f6368",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "8px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: "8px",
  display: "flex",
  alignItems: "center",
}));

const StyledStrong = styled('strong')({
  marginRight: '4px', // Añadir un margen derecho para la separación
});

const GeneralInformation = (infoPersonal) => {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        backgroundColor: "#fff", // Fondo blanco
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave
        borderRadius: '8px', // Borde redondeado opcional para mejor estética
        padding: '16px' // Espaciado interno para que el contenido no esté pegado al borde
      }}
    >
      <Grid item xs={12}>
        <SectionTitle variant="h6">Información General</SectionTitle>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <HomeIcon fontSize="small" />
          </IconButton>
          <StyledStrong>Direccion:</StyledStrong> {infoPersonal.infoPersonal.direccionResidencia}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="primary">
            <AssignmentIndTwoToneIcon fontSize="small" />
          </IconButton>
          <StyledStrong>Estado Civil:</StyledStrong> {infoPersonal.infoPersonal.estadoCivil}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <AssignmentTurnedInTwoToneIcon fontSize="small" />
          </IconButton >
          <StyledStrong>Numero de nit:</StyledStrong> {infoPersonal.infoPersonal.nit}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="primary">
            <PersonTwoToneIcon fontSize="small" />
          </IconButton>
          <StyledStrong>Genero:</StyledStrong> {infoPersonal.infoPersonal.genero ? infoPersonal.infoPersonal.genero : "Sin genero"}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <BusinessIcon fontSize="small" />
          </IconButton>
          <StyledStrong>Afiliacion IGGS:</StyledStrong> {infoPersonal.infoPersonal.numAfiliacionIgss}
        </DetailText>
        {/* Puedes agregar más detalles con íconos aquí */}
      </Grid>
    </Grid>
  );
};

export default GeneralInformation;
