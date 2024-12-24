import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import './ListaAtividades.css';
import useFetchAtividades from '../../../../utils/hooks/useFetchAtividades.js';
import FormCriarAtividade from '../FormCriarAtividade/FormCriarAtividade.jsx'
import dayjs from 'dayjs';
import QuadroAtividades from '../QuadroAtividades/QuadroAtividades.jsx';
import { stylesButton, tabsStyle } from '../../AtividadesStyles.js'

const ListaAtividades = ({ turmaId }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { 
    atividades, 
    fetchAtividadesByProfessor, 
    fetchAtividadesByTurma,
    refetch 
  } = useFetchAtividades();
  
  useEffect(() => {
    const fetchAtividades = async () => {
      if (turmaId) {
        await fetchAtividadesByTurma(turmaId);
      } else {
        await fetchAtividadesByProfessor();
      }
    };

    fetchAtividades();
  }, [turmaId, fetchAtividadesByProfessor, fetchAtividadesByTurma]);

  const onAtividadeCreated = () => {
    if (turmaId) {
      fetchAtividadesByTurma(turmaId);
    } else {
      refetch();
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const atividadesFiltradas = atividades
    .filter(atividade => {
      const dataEncerramento = dayjs(atividade.dataEncerramento, "YYYY-MM-DD");
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
        sx={tabsStyle}
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
        <QuadroAtividades 
          atividades={atividadesFiltradas} 
          onAtividadeCreated={onAtividadeCreated}
        />
      </div>

      {isFormOpen && <FormCriarAtividade onClose={() => setIsFormOpen(false)} onAtividadeCreated={onAtividadeCreated} />}
    </div>
  );
};

export default ListaAtividades;
