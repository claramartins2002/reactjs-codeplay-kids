import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { FaEllipsisVertical } from "react-icons/fa6";
import backgroundTurma from './images/background_turma.png';
import { Menu, MenuItem, Dialog, Tooltip, Tabs, Tab, Box } from '@mui/material';
import useFetchTurma from '../../utils/hooks/useFetchTurma';
import FormCriarTurma from '../../components/turmas/FormTurma/FormTurma';
import FormCriarAluno from '../../components/alunos/FormAluno/FormAluno';
import ListaAlunos from '../../components/alunos/ListaAlunos/ListaAlunos';
import CircularIndeterminate from '../../components/Carregando';
import { tabsStyles, menuStyles, dialogStyles, BoxStyles } from './TurmaStyles.js'
import ListaAtividades from '../Atividades/components/ListaAtividades/ListaAtividades.jsx';
import EstatisticasTurma from './components/EstatisticasTurma/EstatisticasTurma.jsx';

const Turma = () => {
  const location = useLocation();
  const { state } = location;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [turmaToEdit, setTurmaToEdit] = useState(null);
  const [formType, setFormType] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const { turma, loading, error, refetch } = useFetchTurma(state.dataTurma.id);

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) return <CircularIndeterminate />;
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
            <img src={backgroundTurma} alt="Imagem do Banner" />
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
            sx={menuStyles.menu}
          >
            <MenuItem
              onClick={openEditForm}
              sx={menuStyles.menuItem}
            >
              Editar turma
            </MenuItem>
          </Menu>
        </div>
      </div>

      <Box sx={BoxStyles.box}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
          sx={tabsStyles(selectedTab)}
        >
          <Tab label="Alunos" />
          <Tab label="Atividades" />
          <Tab label="Relatórios" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && ( <ListaAlunos turmaId={turma.id} onAddClick={openAddStudentForm} /> )}
          {selectedTab === 1 && ( <ListaAtividades turmaId={turma.id} /> )}
          {selectedTab === 2 && ( <EstatisticasTurma /> )}
        </Box>
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setTurmaToEdit(null);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: dialogStyles.dialogPaper }}
      >
        {formType === 'turma' ? (
          <FormCriarTurma
            onClose={() => {
              setIsFormOpen(false);
              setTurmaToEdit(null);
            }}
            initialData={turmaToEdit}
            onTurmaCreated={refetch}
          />
        ) : (
          <FormCriarAluno
            onClose={() => setIsFormOpen(false)}
            onAlunoCreated={onAlunoCreated}
            turma={turma}
          />
        )}
      </Dialog>
    </>
  );
};

export default Turma;
