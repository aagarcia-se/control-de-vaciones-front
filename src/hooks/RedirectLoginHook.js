// hooks/useRedirectLogin.js

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../services/context/AuthContext.jsx";
import { handleUserRedirect } from "../services/utils/authHelpers.js";

export function useRedirectLogin() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      handleUserRedirect(navigate, userData);
    }
  }, [userData, navigate]);

  return userData;
}