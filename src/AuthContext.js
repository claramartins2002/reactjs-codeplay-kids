import React, { createContext, useState, useEffect } from 'react';
import ApiService from './utils/ApiService';

// Cria o contexto de autenticação
export const AuthContext = createContext();

const apiService = new ApiService();

export const AuthProvider = ({ children }) => {
  // Inicializa o estado com base no valor armazenado no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn === 'true'; // Inicializa como true apenas se o valor no localStorage for 'true'
  });
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [professorName, setProfessorName] = useState(localStorage.getItem('professorName') || null); // Armazena o nome do professor
  const [professorId, setProfessorId] = useState(localStorage.getItem('professorId') || null); // Armazena o nome do professor
  const [error, setError] = useState(null); // Estado para capturar erros no login


  useEffect(() => {
    setLoading(false); // Define carregamento como concluído após verificação
}, []);

// Monitora mudanças no studentId e studentName para debug
useEffect(() => {
  if (professorName) {
    console.log(`Professor name atualizado: ${professorName}`);
  }
  if (professorId) {
    console.log(`Professor id atualizado: ${professorId}`);
  }
  
  
}, [professorName, professorId]);

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
      localStorage.setItem('professorId', data.id);
      setIsAuthenticated(true);
      setProfessorName(data.nome);
      setProfessorId(data.id);

      console.log('Nome do professor definido:', data.nome);
      console.log('Id do professor definido '+data.id);
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


const logout = async () => {
  try {
    // Verifique se o professorId está definido
    if (!professorId) {
      console.error('Erro: professorId não está definido.');
      return;
    }

    // Enviar requisição para marcar notificações como lidas
    await apiService.get(`relatorio/marcar-como-notificado/${professorId}`);

    console.log('Notificações marcadas como lidas com sucesso.');
  } catch (error) {
    console.error('Erro ao marcar notificações como lidas:', error);
  } finally {
    // Certifique-se de limpar o estado após a requisição
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('professorName');
    localStorage.removeItem('professorId');
    setProfessorName(null);
    setProfessorId(null);
    setIsAuthenticated(false); // Atualiza o estado de autenticação apenas no final
  }
};



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, professorName, professorId }}>
      {children}
    </AuthContext.Provider>
  );
};
