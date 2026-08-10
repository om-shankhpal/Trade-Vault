import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setToken, getToken, removeToken } from "../utils/token";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const restoreUser = async () => {
      const token = getToken();

      // No token means the user is logged out.
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Your existing backend profile endpoint.
        const response = await api.get("/profile");

        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to restore user session:", error);

        // Token is invalid/expired.
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = ({ user, token }) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);