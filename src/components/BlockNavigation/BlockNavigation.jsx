// src/components/BlockNavigation.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlockNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, null, window.location.href);
    };

    // Bloquear la navegación hacia atrás
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return null; // Este componente no necesita renderizar nada
};

export default BlockNavigation;
