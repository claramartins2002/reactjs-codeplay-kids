import React, { useContext } from 'react';
import './styles.css';
import { AuthContext } from '../../AuthContext';

const NavbarProf = () => {
  const { professorName } = useContext(AuthContext);

  return (
    <header className="header__middle_prof">
      <div className="container_prof">
        <span style={{margin: '0 15px'}}>Olá Prof {professorName}</span>
      </div>
    </header>
  );
}

export default NavbarProf;
