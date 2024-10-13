import React, { useState } from 'react';
import { FiCalendar, FiClock } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import pencil from '../images/pencil_8289173.png'
import './FormCriarAtividade.css';

const FormCriarAtividade = ({ onClose }) => {
  const [nomeAtividade, setNomeAtividade] = useState('');
  const [jogo, setJogo] = useState('');
  const [turma, setTurma] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para criar a atividade
    console.log({
      nomeAtividade,
      jogo,
      turma,
      data,
      horario,
      observacoes
    });
    onClose(); // Fecha o modal após a criação
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div class="form-header">
          <img src={pencil} alt="" />
          <h2>Criar Atividade</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome da atividade *</label>
            <input 
              type="text" 
              value={nomeAtividade}
              onChange={(e) => setNomeAtividade(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Selecione o jogo *</label>
            <select value={jogo} onChange={(e) => setJogo(e.target.value)} required>
              <option value="">Selecione...</option>
              <option value="Jogo da Memória">Jogo da Memória</option>
              <option value="Quebra Cabeça">Quebra Cabeça</option>
              <option value="Jogo da Divisão">Jogo da Divisão</option>
            </select>
          </div>
          <div className="form-group">
            <label>Selecione a turma *</label>
            <select value={turma} onChange={(e) => setTurma(e.target.value)} required>
              <option value="">Selecione...</option>
              <option value="1º Ano A">1º Ano A</option>
              <option value="2º Ano B">2º Ano B</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data</label>
            <div className="input-with-icon">
              <FiCalendar />
              <input 
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)} 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Horário</label>
            <div className="input-with-icon">
              <FiClock />
              <input 
                type="time" 
                value={horario} 
                onChange={(e) => setHorario(e.target.value)} 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Observações</label>
            <textarea 
              value={observacoes} 
              onChange={(e) => setObservacoes(e.target.value)} 
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn-criar">
            Criar <IoArrowForward/>
          </button>
        </form>
        <button onClick={onClose} className="btn-fechar"><RiCloseLargeFill/></button>
      </div>
    </div>
  );
};

export default FormCriarAtividade;
