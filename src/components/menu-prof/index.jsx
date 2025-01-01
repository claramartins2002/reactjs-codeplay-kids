import React, { useContext } from 'react';
import './styles.css';
import { AuthContext } from '../../AuthContext';

const NavbarProf = () => {
  const { professorName } = useContext(AuthContext);

  return (
    <header className="header__middle_prof">
      <div className="container_prof">
        <span>Olá Prof {professorName}</span>

        <div className="search-expanding">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
          />
        </div>
      </div>
    </header>
  );
}

export default NavbarProf;
