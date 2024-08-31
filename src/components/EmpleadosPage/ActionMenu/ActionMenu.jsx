import React from 'react';
import { Menu, MenuItem, IconButton, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Estilos personalizados
const StyledIconButton = styled(IconButton)({
  color: '#5f6368', // Color de los iconos
});

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    borderRadius: 12,
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.15)'
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: '0.875rem',
  color: '#333',
  '&:hover': {
    backgroundColor: '#f1f3f4',
  },
});

const ActionsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton onClick={handleClick}>
        <MoreVertIcon />
      </StyledIconButton>
      <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={handleClose}>Copy profile link</StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>Print</StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>Export</StyledMenuItem>
        {/* Otros elementos del menú */}
      </StyledMenu>
    </>
  );
};

export default ActionsMenu;
