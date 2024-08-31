import React from 'react';
import { Grid, Typography } from '@mui/material';

const ContactDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="body1"><strong>Email:</strong> elisa@example.com</Typography>
        <Typography variant="body1"><strong>Phone:</strong> +1 (123) 456-7890</Typography>
        {/* More details */}
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Managers information */}
        <Typography variant="h6">Managers</Typography>
        <Typography variant="body1">Sylvia Ruiz</Typography>
        {/* More Managers */}
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Reports and Sales Information */}
        <Typography variant="h6">Reports</Typography>
        <Typography variant="body1">Johannes Miles</Typography>
        {/* More Reports */}
      </Grid>
    </Grid>
  );
};

export default ContactDetails;
