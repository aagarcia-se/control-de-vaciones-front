import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Grid, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getLocalStorageData } from '../../../services/session/getLocalStorageData';

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

const ContactProfile = (infoPersonal) => {

  return (
    <ProfileCard>
      <ProfileAvatar src="/path/to/avatar.jpg" />
      <ProfileContent>
        <Typography variant="h5">
          {`${infoPersonal.infoPersonal.primerNombre} ${infoPersonal.infoPersonal.segundoNombre} ${infoPersonal.infoPersonal.primerApellido} ${infoPersonal.infoPersonal.segundoApellido}`}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Software Engineer - Engineering - link-42
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