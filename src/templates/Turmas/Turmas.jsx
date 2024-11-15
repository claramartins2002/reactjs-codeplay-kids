import React, { useState, useEffect } from 'react';
import TurmaCardList from '../../components/cards/turmas/TurmasCardList';
import ApiService from '../../utils/ApiService';
import FormCriarTurma from '../../components/turmas/FormCriarTurma/FormCriarTurma';
import HeaderTurmas from '../../components/turmas/HeaderTurmas'

const Turmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);

  const fetchTurmas = async () => {
    const api = new ApiService();
    api.getTurmasByProfessor('1').then(async (response) => {
      const turmasComAlunos = await Promise.all(response.map(async (turma) => {
        const alunos = await api.getAlunosByTurma(turma.id);
        return { ...turma, alunos };
      }));
      setTurmas(turmasComAlunos);
    });
  };

  useEffect(() => {
    fetchTurmas(); // Carrega as turmas ao iniciar a página
  }, []);

  const onTurmaCreated = () => {
    fetchTurmas(); // Recarrega a lista de turmas ao criar uma nova turma
  };

  const filteredTurmas = turmas.filter(turma => 
    turma.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <NavbarProf /> */}
      <HeaderTurmas
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsFormOpen(true)}
        saudacao="Olá Profª Gisele"
      />
      {isFormOpen && (
        <FormCriarTurma 
          onClose={() => setIsFormOpen(false)} 
          onTurmaCreated={onTurmaCreated} // Passa a função de recarregar turmas
        />
      )}
      <TurmaCardList turmas={filteredTurmas} />
    </>
  );
};

export default Turmas;
