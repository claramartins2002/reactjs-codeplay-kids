import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa o estado com base no valor armazenado no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn === 'true'; // Inicializa como true apenas se o valor no localStorage for 'true'
  });  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    setLoading(false); // Define carregamento como concluído após verificação
}, []);

  const login = () => {
    // Simula o login
    localStorage.setItem('loggedIn', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Simula o logout
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
