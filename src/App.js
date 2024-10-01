import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Importa o contexto de autenticação
import Navbarmenu from './components/menu';
import Home from './templates/Home';
import Estudos from './templates/Estudos';
import Jogos from './templates/Jogos';
import Login from './templates/Login';
import FormAluno from './templates/FormAluno';
import Dashboard from './templates/Dashboard';
import Overview from './templates/Overview';
import Turmas from './templates/Turmas';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext); // Acessa o estado de autenticação e carregamento
  console.log(isAuthenticated);
  if (loading) {
    // Exibe uma tela de carregamento enquanto o estado de autenticação é verificado
    return <div>Carregando...</div>;
  }
  return (
<div>
    <Router>
            {isAuthenticated && <div><Navbarmenu /></div>} {/* Navbar só aparece se o usuário estiver logado */}

      <Routes>

        {/* Rotas */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} /> {/* Impede de ir para login se já estiver autenticado */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/estudos" element={isAuthenticated ? <Estudos /> : <Navigate to="/login" />} />
        <Route path="/jogos" element={isAuthenticated ? <Jogos /> : <Navigate to="/login" />} />
        <Route path="/Overview" element={isAuthenticated ? <Overview /> : <Navigate to="/login" />} />

        <Route path="/Relatorios" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/Turmas" element={isAuthenticated ? <Turmas /> : <Navigate to="/login" />} />

        <Route path="/alunos/editar" element={isAuthenticated ? <FormAluno/> : <Navigate to="/login" />} />

      </Routes>
    </Router>

    </div> 
  );
}

export default App;
