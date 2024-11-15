// Turma.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import Tooltip from '@mui/material/Tooltip';
import { FaEllipsisVertical } from "react-icons/fa6";
import backgroundTurma from './images/background_turma.png';
import { Menu, MenuItem, Dialog } from '@mui/material';
import useFetchTurma from '../../utils/hooks/useFetchTurma';
import FormCriarTurma from '../../components/turmas/FormCriarTurma/FormCriarTurma';
import FormCriarAluno from '../../components/alunos/FormCriarAluno/FormCriarAluno';
import ListaAlunos from '../../components/alunos/ListaAlunos/ListaAlunos';

const Turma = () => {
  const location = useLocation();
  const { state } = location;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [turmaToEdit, setTurmaToEdit] = useState(null);
  const [formType, setFormType] = useState('');

  const { turma, alunos, loading, error, refetch } = useFetchTurma(state.dataTurma.id);

  const onAlunoCreated = () => {
    refetch(); // Recarrega a lista de alunos ao criar um novo aluno
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openEditForm = () => {
    setTurmaToEdit(turma);
    setFormType('turma');
    setIsFormOpen(true);
    handleMenuClose();
  };

  const openAddStudentForm = () => {
    setFormType('aluno');
    setIsFormOpen(true);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>{turma.nome}</h2>
            <p>{turma.descricao}</p>
          </div>
          <div className="banner-image">
            <img src={backgroundTurma} alt="Imagem do Banner"/>
          </div>

          <Tooltip title="Mais opções">
            <FaEllipsisVertical 
              className="banner-icon" 
              onClick={handleMenuOpen} 
              style={{ cursor: 'pointer' }} 
            />
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ fontFamily: 'Coming Soon' }}
          >
            <MenuItem 
              onClick={openEditForm}
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Coming Soon' }}
            >
              Editar turma
            </MenuItem>
          </Menu>
        </div>
      </div>
      
      <ListaAlunos 
        turmaId={turma.id} 
        onAddClick={openAddStudentForm}
      />
      
      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setTurmaToEdit(null);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            padding: '20px',
            bgcolor: '#FBF7F5',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      > 
        {formType === 'turma' ? (
          <FormCriarTurma 
            onClose={() => {
              setIsFormOpen(false);
              setTurmaToEdit(null);
            }}
            initialData={turmaToEdit}
            onTurmaCreated={refetch} // Recarrega a turma ao editar
          />
        ) : (
          <FormCriarAluno
            onClose={() => setIsFormOpen(false)}
            onAlunoCreated={onAlunoCreated} // Recarrega a lista de alunos ao criar um novo aluno
            turma={turma}
          />
        )}
      </Dialog>
    </>
  );
};

export default Turma;
