import { useContext, createContext, useState } from "react";

const AuthCOntext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthCOntext.Provider value={{ user, setUser }}>
      {children}
    </AuthCOntext.Provider>
  );
};

export const useAuth = () => useContext(AuthCOntext);
