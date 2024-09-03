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

const GeneralInformation = (infoPersonal) => {
  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#f1f3f4" }}>
      <Grid item xs={12}>
        <SectionTitle variant="h6">Información General</SectionTitle>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <HomeIcon fontSize="small" />
          </IconButton>
          <strong>Direccion:</strong> {infoPersonal.infoPersonal.direccionResidencia}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="primary">
            <AssignmentIndTwoToneIcon fontSize="small" />
          </IconButton>
          <strong>Estado Civil: </strong> {infoPersonal.infoPersonal.estadoCivil}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <AssignmentTurnedInTwoToneIcon fontSize="small" />
          </IconButton >
          <strong>Numero de nit: </strong> {infoPersonal.infoPersonal.nit}
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="primary">
            <PersonTwoToneIcon fontSize="small" />
          </IconButton>
          <strong>Genero:</strong> {(infoPersonal.infoPersonal.genero) ? infoPersonal.infoPersonal.genero : "Sin genero" }
        </DetailText>
        <DetailText variant="body1">
          <IconButton color="secondary">
            <BusinessIcon fontSize="small" />
          </IconButton>
          <strong>Afiliacion IGGS:</strong> { infoPersonal.infoPersonal.numAfiliacionIgss }
        </DetailText>
        {/* Puedes agregar más detalles con íconos aquí */}
      </Grid>
    </Grid>
  );
};

export default GeneralInformation;
