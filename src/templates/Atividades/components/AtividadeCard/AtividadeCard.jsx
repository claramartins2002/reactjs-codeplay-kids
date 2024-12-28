import React, { useState } from 'react';
import { GrGamepad } from "react-icons/gr";
import { IconButton, Menu, MenuItem, Dialog } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './AtividadeCard.css';
import dayjs from 'dayjs';
import FormCriarAtividade from '../FormCriarAtividade/FormCriarAtividade';
import { styleMenuItem } from '../../AtividadesStyles.js';
import RelatoriosAtividades from '../RelatoriosAtividade/RelatoriosAtividade.jsx';

const AtividadeCard = ({ atividade, onAtividadeCreated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogStats, setOpenDialogStats] = useState(false);
  const openMenu = Boolean(anchorEl);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenDialogEdit(true);
    handleMenuClose();
  };

  const handleStatsClick = () => {
    setOpenDialogStats(true);
    handleMenuClose();
  };

  const handleEditDialogClose = () => {
    setOpenDialogEdit(false);
  };

  const handleStatsDialogClose = () => {
    setOpenDialogStats(false);
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
          <MenuItem onClick={handleStatsClick} sx={styleMenuItem}>Ver relatório</MenuItem>
        </Menu>
      </div>
      <h3>{atividade.nome}</h3>
      <p className="categoria">{atividade.jogo.nome}</p>
      <div className="details">
        <span className="data">{dayjs(atividade.dataEncerramento).format("DD/MM/YYYY")}</span>
        <span className="turma">{atividade.turma.nome}</span>
      </div>

      <Dialog open={openDialogEdit} onClose={handleEditDialogClose} fullWidth maxWidth="md">
        <FormCriarAtividade 
          onClose={handleEditDialogClose}
          onAtividadeCreated={onAtividadeCreated}
          atividade={atividade}
        />
      </Dialog>

      <Dialog open={openDialogStats} onClose={handleStatsDialogClose} fullWidth maxWidth="md">
        <RelatoriosAtividades 
          atividade={atividade} 
          onClose={handleStatsDialogClose}
        />
      </Dialog>
    </div>
  );
};

export default AtividadeCard;
