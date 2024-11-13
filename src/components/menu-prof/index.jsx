import React from 'react';
import './styles.css';

const NavbarProf = () => {
  return (
    <header className="header__middle_prof">
      <div className="container_prof">
        <span>Olá Profª Gisele</span>

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
