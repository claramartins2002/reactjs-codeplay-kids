import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Importa o contexto de autenticação
import Navbarmenu from './components/menu';
import Estudos from './templates/Estudos';
import Jogos from './templates/Jogos';
import Login from './templates/Login';
import MemoryCardGame from './templates/JogosAtividades/MemoryCardGame';
import PuzzleGame from './templates/JogosAtividades/QuebraCabeca';
import DndExample from './templates/JogosAtividades/DndExample';
import CacaPalavras from './templates/JogosAtividades/CacaPalavras';
import FormAluno from './templates/FormAluno';
import Dashboard from './templates/Dashboard';
import Overview from './templates/Overview';
import Atividades from './templates/Atividades';
import Turma from './templates/OverviewTurma';
import MathGame from './templates/JogosAtividades/MathGame2/MathGame';
import ImageWordAssociationGame from './templates/JogosAtividades/ImageWordAssociationGame/ImageWordAssociationGame';
import ShapeColorGame from './templates/JogosAtividades/ShapeColorGame/ShapeColorGame';
import CountingGame from './templates/JogosAtividades/CountingGame/CountingGame';
import DrawingApp from './templates/JogosAtividades/Drawing/DrawingApp'
import CrosswordComponent from './templates/JogosAtividades/Crossword';
import Turmas from './templates/Turmas/Turmas';
import CircularIndeterminate from './components/Carregando';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext); // Acessa o estado de autenticação e carregamento
  console.log(isAuthenticated);
  if (loading) {
    // Exibe uma tela de carregamento enquanto o estado de autenticação é verificado
    return <CircularIndeterminate/>
  }
  return (
<div>
    <Router>
            {isAuthenticated && <div><Navbarmenu /></div>} {/* Navbar só aparece se o usuário estiver logado */}

      <Routes>

        {/* Rotas Menu*/}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} /> {/* Impede de ir para login se já estiver autenticado */}
        <Route path="/" element={isAuthenticated ? <Overview /> : <Navigate to="/login" />} />
        <Route path="/estudos" element={isAuthenticated ? <Estudos /> : <Navigate to="/login" />} />
        <Route path="/jogos" element={isAuthenticated ? <Jogos /> : <Navigate to="/login" />} />
        <Route path="/Overview" element={isAuthenticated ? <Overview /> : <Navigate to="/login" />} />
        <Route path="/atividades" element={isAuthenticated ? <Atividades /> : <Navigate to="/login" />} />
        <Route path="/turmas/:id" element={isAuthenticated ? <Turma /> : <Navigate to="/login" />} />

        <Route path="/Relatorios" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/Turmas" element={isAuthenticated ? <Turmas /> : <Navigate to="/login" />} />

        <Route path="/alunos/editar" element={isAuthenticated ? <FormAluno/> : <Navigate to="/login" />} />

        {/* Rotas Jogos*/}
        <Route path="/jogos/jogo-da-memoria" element={isAuthenticated ? <MemoryCardGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/quebra-cabeca" element={isAuthenticated ? <PuzzleGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/drag-n-drop" element={isAuthenticated ? <DndExample /> : <Navigate to="/login" />} />
        <Route path="/jogos/math-game" element={isAuthenticated ? <MathGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/crossword" element={isAuthenticated ? <CrosswordComponent /> : <Navigate to="/login" />} />
        <Route path="/jogos/caca-palavras" element={isAuthenticated ? <CacaPalavras /> : <Navigate to="/login" />} />
        <Route path="/jogos/imagem-palavra-associacao" element={isAuthenticated ? <ImageWordAssociationGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/shape-color" element={isAuthenticated ? <ShapeColorGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/counting" element={isAuthenticated ? <CountingGame /> : <Navigate to="/login" />} />
        <Route path="/jogos/drawing" element={isAuthenticated ? <DrawingApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>

    </div> 
  );
}

export default App;
