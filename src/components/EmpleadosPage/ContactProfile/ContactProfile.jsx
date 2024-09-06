import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Grid, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Estilos personalizados
const ProfileCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  padding: 16,
  marginBottom: 16,
  borderRadius: 12,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
});

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  marginRight: 16,
});

const ProfileContent = styled(CardContent)({
  flex: '1 0 auto',
});

const ContactProfile = ({infoPersonal, infoDpi}) => {
  // Verificar que infoPersonal e infoDpi existen
  const nombreCompleto = infoPersonal?.primerNombre && infoPersonal?.primerApellido 
    ? `${infoPersonal.primerNombre} ${infoPersonal.segundoNombre || ''} ${infoPersonal.primerApellido} ${infoPersonal.segundoApellido || ''}` 
    : 'Nombre no disponible';

  const numeroDocumento = infoDpi?.numeroDocumento || 'Documento no disponible';

  return (
    <ProfileCard>
      <ProfileAvatar src="/path/to/avatar.jpg" />
      <ProfileContent>
        <Typography variant="h5">
          {nombreCompleto}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Numero de CUI:</strong> {numeroDocumento}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ProfileContent>
    </ProfileCard>
  );
};

export default ContactProfile;
