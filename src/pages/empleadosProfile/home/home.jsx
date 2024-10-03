import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import Sidebar from "../../../components/EmpleadosPage/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Spinner from "../../../components/spinners/spinner";
import { useCheckSession } from "../../../services/session/checkSession";

// Estilo para la animación
const styles = {
  slideIn: {
    animation: "slide-in 0.5s forwards",
  },
};

// Animación de entrada desde el lado derecho
const keyframes = `
  @keyframes slide-in {
    0% {
      transform: translateX(100%); /* Comienza fuera de la pantalla a la derecha */
      opacity: 0; /* Comienza completamente transparente */
    }
    100% {
      transform: translateX(0); /* Termina en su posición original */
      opacity: 1; /* Termina completamente visible */
    }
  }
`;

const images = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaypePzMzS_4eqa5v7dxPEwauOWLmX00Y_A&s",
    alt: "Imagen 1",
  },
  {
    src: "https://www.bizneo.com/blog/wp-content/uploads/2019/05/Como-se-calculan-las-vacaciones-810x455.jpg",
    alt: "Imagen 2",
  },
  {
    src: "https://agn.gt/wp-content/uploads/2024/07/GMalRYPWAAAxkPc.jpg",
    alt: "Imagen 3",
  },
];

const HomePage = () => {
  const isSessionVerified = useCheckSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0); // Índice de la imagen actual
  const [animate, setAnimate] = useState(true); // Estado para controlar la animación

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNext = () => {
    setAnimate(false); // Desactiva la animación
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setAnimate(false); // Desactiva la animación
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Cambia automáticamente a la siguiente imagen
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    // Habilita la animación de nuevo después de que se cambie la imagen
    setAnimate(true);
  }, [currentImage]);

  if (!isSessionVerified) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", height: "80vh", backgroundColor: "#f1f3f4" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{
          width: { xs: mobileOpen ? "240px" : 0, md: "240px" },
          flexShrink: { md: 0 },
          overflowY: "auto",
          transition: "width 0.3s",
          borderRight: { md: "1px solid #ddd" },
          position: { xs: "absolute", md: "relative" },
          zIndex: 1200,
        }}
      >
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: "100px" } }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Bienvenido
        </Typography>

        <style>
          {keyframes}
        </style>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Carrusel */}
          <Box
            sx={{
              width: "80%",
              textAlign: "center",
              overflow: "hidden", // Evita el scroll vertical
              height: "400px", // Establece una altura fija para el carrusel
              position: "relative",
            }}
          >
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              style={{
                width: "100%",
                height: "100%", // Asegura que la imagen ocupe toda la altura
                borderRadius: "10px",
                objectFit: "cover", // Mantiene la relación de aspecto y cubre el área
                ...(animate ? styles.slideIn : {}), // Aplica la animación solo si está habilitada
              }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {images[currentImage].alt}
            </Typography>
          </Box>

          {/* Controles del Carrusel (opcional) */}
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", mt: 2 }}>
            <Button variant="contained" onClick={handlePrev}>
              Anterior
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Siguiente
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
