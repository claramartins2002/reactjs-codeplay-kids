import React from 'react';
import { CgInfo } from "react-icons/cg";
import { GrGamepad } from "react-icons/gr";
import './AtividadeCard.css';

const AtividadeCard = ({ atividade }) => {
  return (
    <div className="card-container">
      <div className="info-icon"><CgInfo/></div>
      <div className="game-icon"><GrGamepad/></div>
      <h3>{atividade.nome}</h3>
      <p className="categoria">{atividade.categoria}</p>
      <div className="details">
        <span className="data">{atividade.data}</span>
        <span className="horario">{atividade.horario}</span>
      </div>
    </div>
  );
};

export default AtividadeCard;
