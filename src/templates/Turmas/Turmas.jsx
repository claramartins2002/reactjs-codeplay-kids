import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import TurmaCardList from '../../components/cards/turmas/TurmasCardList';
import FormCriarTurma from '../../components/turmas/FormTurma/FormTurma';
import useFetchTurmas from '../../utils/hooks/useFetchTurmas';
import './styles.css'

const Turmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Usa o hook useFetchTurmas para obter todas as turmas
  const { turmas, refetch } = useFetchTurmas();

  const filteredTurmas = turmas.filter(turma =>
    turma.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onTurmaCreated = () => {
    refetch(); // Recarrega as turmas após a criação de uma nova turma
    setIsFormOpen(false); // Fecha o formulário após a criação
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Barra de busca e botão adicionar */}
      <div className='container-bar-btn-turmas'>
        <input
          className='search-bar-turmas'
          type="text"
          placeholder="Buscar turma..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className='btn-add-turma'
        >
          <Add /> Nova Turma
        </button>
      </div>

      {/* Formulário de criação de turma */}
      {isFormOpen && (
        <FormCriarTurma 
          onClose={() => setIsFormOpen(false)} 
          onTurmaCreated={onTurmaCreated}
        />
      )}

      {/* Lista de turmas */}
      <TurmaCardList turmas={filteredTurmas} />
    </div>
  );
};

export default Turmas;
