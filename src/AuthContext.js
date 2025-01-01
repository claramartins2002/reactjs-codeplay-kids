import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa o estado com base no valor armazenado no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn === 'true'; // Inicializa como true apenas se o valor no localStorage for 'true'
  });
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [professorName, setProfessorName] = useState(localStorage.getItem('professorName') || null); // Armazena o nome do professor
  const [error, setError] = useState(null); // Estado para capturar erros no login


  useEffect(() => {
    setLoading(false); // Define carregamento como concluído após verificação
}, []);

// Monitora mudanças no studentId e studentName para debug
useEffect(() => {
  if (professorName) {
    console.log(`Professor name atualizado: ${professorName}`);
  }
  
  
}, [professorName]);

const login = async (email, senha) => {
  try {
    setLoading(true);
    setError(null);

    console.log(email, senha);

    const response = await fetch(`http://localhost:8080/professor/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro no login. Verifique suas credenciais.');
    }

    const data = await response.json();
    console.log('Resposta do servidor:', data);

    if (data) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('professorName', data.nome);
      setIsAuthenticated(true);
      setProfessorName(data.nome);

      console.log('Nome do professor definido:', data.nome);
    } else {
      throw new Error(data.message || 'Credenciais inválidas.');
    }
  } catch (err) {
    setError(err.message);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    // Simula o logout
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
    localStorage.removeItem('professorName');
    setProfessorName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, professorName }}>
      {children}
    </AuthContext.Provider>
  );
};
