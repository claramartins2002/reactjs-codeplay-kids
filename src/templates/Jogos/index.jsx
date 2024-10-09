import {NavLink} from 'react-router-dom';
import './styles.css';

function Jogos() {
  return (
    <div className="container-jogos">
      <div className='card purple'>
        <NavLink className='is-active' to={`/jogos/quebra-cabeca`}> 
          <h2>Quebra-Cabeça</h2> 
        </NavLink>
      </div>
      <div className='card green'>
        <NavLink className='is-active' to={`/jogos/jogo-da-memoria`}> 
          <h2>Jogo da Memória</h2> 
        </NavLink>
      </div>
      <div className='card yellow'>
        <NavLink className='is-active' to={`/jogos/drag-n-drop`}>
          <h2>Drag and Drop</h2> 
        </NavLink>
      </div>
      <div className='card green'>
        <NavLink className='is-active' to={`/jogos/math-game`}> 
          <h2>Jogo de matemática</h2> 
        </NavLink>
      </div>
      <div className='card purple'>
        <NavLink className='is-active' to={`/jogos/crossword`}> 
          <h2>Palavras Cruzadas</h2> 
        </NavLink>
      </div>
      <div className='card yellow'>
        <NavLink className='is-active' to={`/jogos/caca-palavras`}> 
          <h2>Caça Palavras</h2> 
        </NavLink>
      </div>
    </div> 
  )
}

export default Jogos;
