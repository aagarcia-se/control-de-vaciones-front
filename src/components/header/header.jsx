import React from 'react';
import { Container, Grid, Typography, styled } from '@mui/material';
import { WorkOutline } from '@mui/icons-material';

const StyledContainer = styled(Container)({
  backgroundColor: (props) => props.colorBg || '#f9fbe7',
  padding: (props) => props.py || '5rem 2rem',
  textAlign: 'center',
});

function EmployeeManagementHeader({ title, icon, colorBg, py }) {
  return (
    <StyledContainer colorBg={colorBg} py={py}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ mb: 2 }}>
          {icon && React.createElement(icon, { fontSize: 'large', sx: { color: '#311b92' } })}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: '#311b92' }}>
            {title || 'Gestionar Empleados'}
          </Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default EmployeeManagementHeader;
