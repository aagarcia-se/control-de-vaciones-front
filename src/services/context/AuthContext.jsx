import { login } from "../auth/auth.js";
import { createContext, useState } from  "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async (username, Password) => {
    setLoading(true);
    setError(null);

    try {
        const response = await login(username, Password);
        setUserData(response.userLogin.userData);                                                          
        localStorage.setItem('userData', JSON.stringify(response.userLogin.userData));    
    } catch (err) {
      setError(
        "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };




  const data = { userData, authenticate, loading, error };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
