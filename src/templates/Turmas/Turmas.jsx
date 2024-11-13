import React, { useState, useEffect } from 'react';
import TurmaCardList from '../../components/cards/turmas/TurmasCardList';
import FormCriarTurma from '../../components/cards/turmas/components/FormCriarTurma/FormCriarTurma'
import HeaderTurmas from '../../components/cards/turmas/components/HeaderTurmas';
import ApiService from '../../utils/ApiService';

const Turmas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const api = new ApiService();

    // Obter turmas
    api.getTurmasByProfessor('1').then(async (response) => {
      const turmasComAlunos = await Promise.all(response.map(async (turma) => {
        const alunos = await api.getAlunosByTurma(turma.id);
        return { ...turma, alunos };
      }));
      setTurmas(turmasComAlunos);
    });
  }, []);

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
      {isFormOpen && <FormCriarTurma onClose={() => setIsFormOpen(false)} />}
      <TurmaCardList turmas={filteredTurmas} />
    </>
  );
};

export default Turmas;
