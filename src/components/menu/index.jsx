import React,{useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {FiAlignRight,FiXCircle, FiChevronDown, FiUser, FiSettings, FiBell, FiLogOut } from "react-icons/fi";
import logo from '../../img/logo.png';
import { PiUsersFour, PiHouse } from "react-icons/pi";
import { GrGamepad } from "react-icons/gr";
import { Menu, MenuItem, Avatar, Chip, Box } from '@mui/material';

import './styles.css';
import { AuthContext } from '../../AuthContext';

const Navbarmenu = () => {

  const { logout } = useContext(AuthContext); // Pega a função de login do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para a home após login
  };

  const menuItemStyles = { display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Coming Soon' }


  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let boxClass = ["main-menu menu-right menuq1"];
  if(isMenu) {
      boxClass.push('menuq2');
  }else{
      boxClass.push('');
  }

  return (
    <header className="header__middle">
      <div className="menu-container">
        <div className="row">

          {/* Add Logo  */}
          <div className="header__middle__logo">
            <NavLink exact activeClassName='is-active' to="/">
              <img src={logo} alt="logo" /> 
            </NavLink>
          </div>

          <div className="header__middle__menus">
            <nav className="main-nav " >
              {/* Responsive Menu Button */}
              {isResponsiveclose === true ? <> 
                  <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
              </> : <> 
                  <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
              </>}

              <ul className={boxClass.join(' ')}>
                <li className="menu-item " >
                  <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to={`/`}><PiHouse /> Overview </NavLink> 
                </li> 

                <li className="menu-item " >
                  <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to={`/Jogos`}><GrGamepad/> Atividades </NavLink> 
                </li>

                <li className="menu-item " >
                  <NavLink  className={({ isActive }) => isActive ? 'is-active' : ''} to={`/Turmas`}><PiUsersFour/> Turmas </NavLink> 
                </li>
              </ul>

              {/* a ideia é colocar o logout no menu do professor, aqui não ficou bom (mas funciona) */}
            </nav>     
          </div>

          <div className="header__end__menus">
            <Chip
              avatar={
                <Avatar sx={{ width: 50, height: 50, color: '#FFF', backgroundColor: 'transparent' }}>
                  <FiUser style={{width: 50, height: 50, color: '#FFF'}}/>
                </Avatar>
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Olá, usuário</span>
                  <FiChevronDown style={{ color: '#FFF' }} />
                </Box>
              }
              onClick={handleMenuOpen}
              variant="outlined"
              sx={{
                fontSize: '1.1rem',
                padding: '0.5rem 1rem',
                height: 'auto',
                borderRadius: '30px',
                fontFamily: 'Coming Soon',
                borderColor: '#FFF',
                color: '#FFF'
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ fontFamily: 'Coming Soon' }}
            >
              <MenuItem 
                onClick={handleMenuClose}
                sx={menuItemStyles}
              >
                <FiSettings />
                <span>Configurações</span>
              </MenuItem>
              <MenuItem 
                onClick={handleMenuClose}
                sx={menuItemStyles}
              >
                <FiBell />
                <span>Notificações</span>
              </MenuItem>
              <MenuItem 
                onClick={() => { handleMenuClose(); handleLogout(); }}
                sx={menuItemStyles}
              >
                <FiLogOut />
                <span>Logout</span>
              </MenuItem>
            </Menu>

          </div> 
        </div>
      </div>
    </header>
  )
}

export default Navbarmenu