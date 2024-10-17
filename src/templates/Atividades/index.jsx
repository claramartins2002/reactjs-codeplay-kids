import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { FiPlus } from "react-icons/fi";
import './styles.css';
import AtividadeCard from './components/AtividadeCard';
import FormCriarAtividade from './components/FormCriarAtividade';

const Atividades = () => {
  // Define a aba inicial como "Criadas" (índice 0)
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const atividadesFiltradas = atividades
    .filter(atividade => 
      (selectedTab === 0 && atividade.status === 'Criadas') ||
      (selectedTab === 1 && atividade.status === 'Finalizadas')
    )
    .filter(atividade => 
      atividade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atividade.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="atividades-container">
      {/* Tabs de "Criadas" e "Finalizadas" */}
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        sx={{
          '& .MuiTab-root': {
            fontFamily: 'Coming Soon',
            fontSize: '1.1rem',
            color: '#000',
            '&.Mui-selected': {
              color: '#7AD487',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#7AD487',
          },
        }}
      >
        <Tab label="Criadas" />
        <Tab label="Finalizadas" />
      </Tabs>

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
        <h2>{selectedTab === 0 ? 'Aqui estão as atividades já criadas!' : 'Aqui estão as atividades finalizadas!'}</h2>
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
      {selectedTab === 0 && (
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
