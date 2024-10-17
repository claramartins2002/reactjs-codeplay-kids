import React, { useState } from 'react';
import StudentList from './components/StudentList/StudentList';
import { useLocation } from 'react-router-dom';
import './styles.css';
import Tooltip from '@mui/material/Tooltip';
import { FaEllipsisVertical } from "react-icons/fa6";
import backgroundTurma from './images/background_turma.png';
import { Menu, MenuItem } from '@mui/material';

const Turma = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state.dataTurma);

  const [anchorEl, setAnchorEl] = useState(null);

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
            <p>{state.dataTurma.periodo}</p>
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
      
      <StudentList studentsData={state.dataTurma.alunos}/>
    </>
  );
}

export default Turma;
