import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import './styles.css';
import AtividadeCard from './components/AtividadeCard';
import Tabs from './components/Tabs';
import FormCriarAtividade from './components/FormCriarAtividade';

const Atividades = () => {
  const [selectedTab, setSelectedTab] = useState('Criadas');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);


  // Array de objetos de atividades
  const atividades = [
    {
      id: 1,
      nome: 'Jogo da divisão',
      categoria: 'Matemática',
      data: '18 Jun',
      horario: '09:00 - 10:00',
      status: 'Criadas' // Pode ser 'Criadas' ou 'Finalizadas'
    },
    {
      id: 2,
      nome: 'Quebra cabeça',
      categoria: 'Lógica',
      data: '18 Jun',
      horario: '09:00 - 10:00',
      status: 'Criadas'
    },
    {
      id: 3,
      nome: 'Caça Palavras',
      categoria: 'Português',
      data: '18 Jun',
      horario: '09:00 - 10:00',
      status: 'Criadas'
    },
    {
      id: 4,
      nome: 'Jogo da Memória',
      categoria: 'Lógica',
      data: '20 Jun',
      horario: '10:00 - 11:00',
      status: 'Finalizadas'
    }
  ];

  // Função para filtrar atividades com base na aba ativa (Criadas ou Finalizadas) e no termo de busca
  const atividadesFiltradas = atividades
    .filter(atividade => atividade.status === selectedTab)
    .filter(atividade => 
      atividade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atividade.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="atividades-container">
      {/* Separador Criadas / Finalizadas com transição de glider */}
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={['Criadas', 'Finalizadas']}
      />

      {/* Campo de busca com ícone */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar atividades por nome ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Renderizar atividades filtradas */}
      <div className="atividades-list">
        <h2>{selectedTab === 'Criadas' ? 'Aqui estão as atividades já criadas!' : 'Aqui estão as atividades finalizadas!'}</h2>
        <div className="atividade-cards-container">
          {atividadesFiltradas.length > 0 ? (
            atividadesFiltradas.map((atividade) => (
              <AtividadeCard key={atividade.id} atividade={atividade} />
            ))
          ) : (
            <p>Nenhuma atividade encontrada</p>
          )}
        </div>
      </div>

      {/* Botão de Nova Atividade */}
      {selectedTab === 'Criadas' && (
        <button 
        className="nova-atividade-btn animate" 
        onClick={() => setIsFormOpen(true)}
      >
        <FiPlus /> Nova atividade
      </button>
      )}

      {/* Formulário de Criar Atividade (Modal) */}
      {isFormOpen && <FormCriarAtividade onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Atividades;
