import { createContext, useContext, useState } from "react";
import { setToken, removeToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = ({ user, token }) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    removeToken();
    navigate("/");
    setUser(null);
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
