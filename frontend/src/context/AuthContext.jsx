import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: localStorage.getItem("userEmail") || "",
    password: localStorage.getItem("userPassword") || "",
    isAuthenticated: localStorage.getItem("userEmail") ? true : false,
  });

  const login = (email, password) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    setUser({
      email,
      password,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    sessionStorage.removeItem("cart");
    setUser({
      email: "",
      password: "",
      isAuthenticated: false,
    });
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
