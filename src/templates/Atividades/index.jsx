import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import './styles.css';
import AtividadeCard from './components/AtividadeCard';
import FormCriarAtividade from './components/FormCriarAtividade/FormCriarAtividade'; 
import ApiService from '../../utils/ApiService';

const Atividades = () => {
  // Define a aba inicial como "Criadas" (índice 0)
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [atividades, setAtividades] = useState([])

  const stylesButton = {
    backgroundColor: '#7fe287',
    color: '#fff',
    fontSize: '21px',
    margin: '20px',
    fontFamily: 'Irish Grover',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textTransform: 'none',
  };

  useEffect(() => {
    const api = new ApiService();

    // Obter turmas
    api.getAtividadesByProfessor('1').then(async (response) => {
      setAtividades(response)
    });
  }, []);

  console.log(atividades);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const atividadesFiltradas = atividades
    .filter(atividade => 
      (selectedTab === 0 && atividade.status === 1) ||
      (selectedTab === 1 && atividade.status === 0)
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

      <div className="header-atividades-container">
        {/* Campo de busca com ícone */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar atividades por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Botão de Nova Atividade */}
        {selectedTab === 0 && (
          <Button variant="contained" startIcon={<Add />} sx={stylesButton} onClick={() => setIsFormOpen(true)}>
          Nova atividade
          </Button>
        )}
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

      {/* Formulário de Criar Atividade (Modal) */}
      {isFormOpen && <FormCriarAtividade onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Atividades;
