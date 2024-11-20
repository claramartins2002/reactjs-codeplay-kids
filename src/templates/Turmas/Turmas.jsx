import React, { useState } from 'react';
import TurmaCardList from '../../components/cards/turmas/TurmasCardList';
import FormCriarTurma from '../../components/turmas/FormTurma/FormTurma';
import HeaderTurmas from '../../components/turmas/HeaderTurmas'
import useFetchTurmas from '../../utils/hooks/useFetchTurmas';

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
  };

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
