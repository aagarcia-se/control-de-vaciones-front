// eventHandlers.js
export const handleSubmit = async (event, authenticate, username, password) => {
    event.preventDefault();
    await authenticate(username, password);
  };
  
  export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
  };
  
  export const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  