import React, { useState } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import './styles.css';
import AtividadeCard from './components/AtividadeCard';
import useFetchAtividades from '../../utils/hooks/useFetchAtividades';
import FormCriarAtividade from '../Atividades/components/FormCriarAtividade/FormCriarAtividade'
import dayjs from 'dayjs';

const Atividades = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const { atividades, refetch } = useFetchAtividades();

  const onAtividadeCreated = () => {
    refetch();
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const atividadesFiltradas = atividades
    .filter(atividade => {
      const dataEncerramento = dayjs(atividade.dataEncerramento, "DD/MM/YYYY");
      const isFinalizada = dataEncerramento.isBefore(dayjs());

      return (
        (selectedTab === 0 && !isFinalizada) || // Atividades criadas (não finalizadas)
        (selectedTab === 1 && isFinalizada) // Atividades finalizadas
      );
    })
    .filter(atividade => 
      atividade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atividade.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="atividades-container">
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar atividades por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {selectedTab === 0 && (
          <Button variant="contained" startIcon={<Add />} sx={stylesButton} onClick={() => setIsFormOpen(true)}>
            Nova atividade
          </Button>
        )}
      </div>

      <div className="atividades-list">
        <h2>{selectedTab === 0 ? 'Aqui estão as atividades já criadas!' : 'Aqui estão as atividades finalizadas!'}</h2>
        <div className="atividade-cards-container">
          {atividadesFiltradas.length > 0 ? (
            atividadesFiltradas.map((atividade) => (
              <AtividadeCard key={atividade.id} atividade={atividade} onAtividadeCreated={onAtividadeCreated}/>
            ))
          ) : (
            <p>Nenhuma atividade encontrada</p>
          )}
        </div>
      </div>

      {isFormOpen && <FormCriarAtividade onClose={() => setIsFormOpen(false)} onAtividadeCreated={onAtividadeCreated} />}
    </div>
  );
};

export default Atividades;
