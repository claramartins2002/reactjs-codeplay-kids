import React from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MdSearch } from 'react-icons/md';

function HeaderTurmas({ searchTerm, onSearchChange, onAddClick, saudacao }) {
  const stylesButton = {
    backgroundColor: '#FFF',
    color: '#7AD487',
    fontSize: '19px',
    margin: '0',
    height: '50%',
    fontFamily: 'Irish Grover',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textTransform: 'none'
  };

  return (
    <header className="header__middle_prof">
      <div className="container_prof">
        <span className="saudacao">{saudacao}</span>
        <div className="actions-header-class">
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={stylesButton}
            onClick={onAddClick}
          >
            Adicionar
          </Button>
          <div className="search-expanding">
            <MdSearch className="search-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTurmas;
