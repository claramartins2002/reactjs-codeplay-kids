// index.jsx
import React, { useState } from 'react';
import StudentList from './components/StudentList/StudentList';
import { useLocation } from 'react-router-dom';
import './styles.css';
import Tooltip from '@mui/material/Tooltip';
import { FaEllipsisVertical } from "react-icons/fa6";
import backgroundTurma from './images/background_turma.png';
import { Menu, MenuItem, Dialog } from '@mui/material';
import FormCriarAluno from './components/FormCriarAluno/FormCriarAluno';

const Turma = () => {
  const location = useLocation();
  const { state } = location;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>Turma do {state.dataTurma.nome}</h2>
            <p>{state.dataTurma.descricao}</p>
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
              onClick={() => { handleMenuClose(); }}
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Coming Soon' }}
            >
              Editar turma
            </MenuItem>
          </Menu>
        </div>
      </div>
      
      <StudentList 
        studentsData={state.dataTurma.alunos} 
        onAddClick={() => setIsFormOpen(true)} 
      />
      
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
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
        <FormCriarAluno onClose={() => setIsFormOpen(false)} />
      </Dialog>
    </>
  );
}

export default Turma;
