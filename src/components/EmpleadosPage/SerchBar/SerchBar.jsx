import React from 'react';
import { AppBar, Toolbar, TextField, InputAdornment, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Estilos personalizados
const SearchAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  color: "#000000",
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});

const SearchField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: '#f1f3f4',
  },
  [theme.breakpoints.down('sm')]: {
    width: '70%',
  },
}));

const SearchBar = () => {
  return (
    <SearchAppBar position="static">
      <Toolbar>
        <SearchField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
    </SearchAppBar>
  );
};

export default SearchBar;
