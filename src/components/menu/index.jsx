import React,{useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {FiAlignRight,FiXCircle } from "react-icons/fi";
import logo from '../../img/logo.png';
import { PiUsersFour, PiHouse } from "react-icons/pi";
import { GrGamepad } from "react-icons/gr";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

import './styles.css';
import { AuthContext } from '../../AuthContext';

const Navbarmenu = () => {

  const { logout } = useContext(AuthContext); // Pega a função de login do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para a home após login
  };


  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
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
            <li className="menu-item">
              <button><IoSettingsOutline /></button>
            </li>
            <li className="menu-item">
              <button><IoNotificationsOutline /></button>
            </li>
            <li className="menu-item">
              <button><FaRegCircleUser/></button>
              <NavLink onClick={handleLogout}> Logout </NavLink>
            </li>
          </div> 
        </div>
      </div>
    </header>
  )
}

export default Navbarmenu