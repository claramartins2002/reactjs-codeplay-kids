import React, { useState } from 'react';
import { GrGamepad } from "react-icons/gr";
import { IconButton, Menu, MenuItem, Dialog } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './AtividadeCard.css';
import FormCriarAtividade from './FormCriarAtividade/FormCriarAtividade';

const AtividadeCard = ({ atividade, onAtividadeCreated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const openMenu = Boolean(anchorEl);

  const styleMenuItem = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Coming Soon' }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="card-container">
      <div className="icons-atividade-card">
        <div className="game-icon"><GrGamepad /></div>
        <IconButton
          aria-label="more"
          onClick={handleMenuClick}
        >
          <MoreVertIcon sx={{color: '#FFF'}}/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick} sx={styleMenuItem}>Editar</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={styleMenuItem}>Ver relatório</MenuItem>
        </Menu>
      </div>
      <h3>{atividade.nome}</h3>
      <p className="categoria">{atividade.jogo.nome}</p>
      <div className="details">
        <span className="data">{atividade.dataCriacao}</span>
        <span className="turma">{atividade.turma.nome}</span>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="md">
        <FormCriarAtividade 
          onClose={handleDialogClose}
          onAtividadeCreated={onAtividadeCreated}
          atividade={atividade}
        />
      </Dialog>
    </div>
  );
};

export default AtividadeCard;
