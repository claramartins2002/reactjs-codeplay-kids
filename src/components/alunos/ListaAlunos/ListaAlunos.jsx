import React, { useState, useMemo } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import StudentListItem from '../StudentListItem/StudentListItem';
import useStudentColors from '../../../utils/hooks/useStudentsColor';
import StudentDialog from '../StudentDialog/StudentDialog';
import ListaAlunosHeader from '../ListaAlunosHeader/ListaAlunosHeader';
import FormCriarAluno from '../FormAluno/FormAluno';
import './ListaAlunos.css';
import useFetchTurma from '../../../utils/hooks/useFetchTurma';
import CircularIndeterminate from '../../Carregando';
import { ListStyles } from '../AlunosStyles';

const ListaAlunos = ({ turmaId, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditModal, setOpenEditModal] = useState(null);
  const [openPerformanceDialog, setOpenPerformanceDialog] = useState(null);

  // Usando o hook useFetchTurma para obter turma e alunos
  const { turma, alunos, loading, error, refetch } = useFetchTurma(turmaId);
  const studentColors = useStudentColors(alunos);

  const filteredStudents = useMemo(() => (
    alunos.filter(student => student.nome?.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [alunos, searchTerm]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const openEditForm = (student) => {
    setOpenEditModal(student);
    setOpenPerformanceDialog(null); // Garante que apenas o Edit estará aberto
  };

  const openPerformanceDialogHandler = (student) => {
    setOpenPerformanceDialog(student);
    setOpenEditModal(null); // Garante que apenas o Desempenho estará aberto
  };

  const handleDeleteStudent = async (student) => {
    const confirmDelete = window.confirm(`Tem certeza de que deseja deletar o aluno ${student.nome}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/aluno/${student.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar o aluno. Por favor, tente novamente.');
      }

      alert(`Aluno ${student.nome} deletado com sucesso!`);
      refetch(); // Atualiza a lista de alunos
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      alert('Não foi possível deletar o aluno. Tente novamente mais tarde.');
    }
  };

  // Função chamada após a criação ou edição de um aluno
  const onAlunoCreated = () => {
    refetch(); // Recarrega os dados da turma e alunos após a criação ou edição de um aluno
  };

  return (
    <>
      <div className="student-list-container">
        <ListaAlunosHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAddClick={onAddClick}
        />
        {loading ? (
          <CircularIndeterminate />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <List sx={ListStyles}>
            {filteredStudents.length ? (
              filteredStudents.map((student) => (
                <StudentListItem
                  key={student.id}
                  student={student}
                  color={studentColors[student.id]}
                  onEdit={() => openEditForm(student)}
                  onPerformance={openPerformanceDialogHandler} // Passa a função para abrir o diálogo de desempenho
                  onDelete={handleDeleteStudent} // Passa a função de deletar
                />
              ))
            ) : (
              <ListItem className="empty-student-list">
                <ListItemText primary="Nenhum aluno encontrado." sx={{ fontFamily: 'Coming Soon' }} />
              </ListItem>
            )}
          </List>
        )}
        {openEditModal && (
          <FormCriarAluno
            onClose={() => setOpenEditModal(null)}
            onAlunoCreated={onAlunoCreated} // Passa a função que recarrega os dados
            initialData={openEditModal}
            turma={turma}
          />
        )}
        {openPerformanceDialog && (
          <StudentDialog
            open={Boolean(openPerformanceDialog)}
            student={openPerformanceDialog}
            color={studentColors[openPerformanceDialog.id]}
            onClose={() => setOpenPerformanceDialog(null)} // Função para fechar o dialog
          />
        )}
      </div>
    </>
  );
};

export default ListaAlunos;
