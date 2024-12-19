import React from 'react';
import AtividadeCard from '../AtividadeCard/AtividadeCard';
import './QuadroAtividades.css';

const QuadroAtividades = ({ atividades, onAtividadeCreated }) => {
  return (
    <div className="atividade-cards-container">
      {atividades.length > 0 ? (
        atividades.map((atividade) => (
          <AtividadeCard 
            key={atividade.id} 
            atividade={atividade} 
            onAtividadeCreated={onAtividadeCreated}
          />
        ))
      ) : (
        <p>Nenhuma atividade encontrada</p>
      )}
    </div>
  );
};

export default QuadroAtividades;