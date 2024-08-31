import React from 'react';
import { Grid, Typography, styled, useMediaQuery, useTheme } from '@mui/material';

// Estilos personalizados usando sx
const DetailText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  marginBottom: '8px',
  color: '#5f6368',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const ContactDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <DetailText variant="body1"><strong>Email:</strong> elisa@example.com</DetailText>
        <DetailText variant="body1"><strong>Phone:</strong> +1 (123) 456-7890</DetailText>
        {/* Más detalles */}
      </Grid>
      <Grid item xs={12} md={4}>
        <SectionTitle variant="h6">Managers</SectionTitle>
        <DetailText variant="body1">Sylvia Ruiz</DetailText>
        {/* Más información de Managers */}
      </Grid>
      <Grid item xs={12} md={4}>
        <SectionTitle variant="h6">Reports</SectionTitle>
        <DetailText variant="body1">Johannes Miles</DetailText>
        {/* Más información de Reports */}
      </Grid>
    </Grid>
  );
};

export default ContactDetails;
