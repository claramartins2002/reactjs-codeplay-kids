

import { MdDensityMedium,MdOutlineHome,MdPeople,MdOutlineLeaderboard,MdNotificationsNone } from 'react-icons/md';
import './styles.css';
import { slide as Menu } from 'react-burger-menu'

const NavbarProf = () => {

 return (
    <header className="header__middle_prof">
        <div className="container_prof">

        <Menu>
        <a id="dashboard" className="menu-item" href="/Dashboard"><MdOutlineHome /> Overview</a>
        <a id="turmas" className="menu-item" href="/Turmas"><MdPeople /> Minhas turmas</a>
        <a id="relatorios" className="menu-item" href="/Relatorios"><MdOutlineLeaderboard /> Relatórios</a>
        <a id="notificacoes" className="menu-item" href="/Notificacoes"><MdNotificationsNone /> Notificações</a>
      </Menu> 
      <MdDensityMedium/>   Olá Prof Gisele
	    </div>
    </header>
    )
}

export default NavbarProf;