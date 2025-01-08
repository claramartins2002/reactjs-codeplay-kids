import React, { useState, useEffect } from 'react';
import { List, ListItem, Box, Chip } from '@mui/material';
import './styles.css';
import { MdMood, MdMoodBad } from 'react-icons/md';
import ApiService from '../../../utils/ApiService';

const NotificacoesCard = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const apiService = new ApiService();
        const response = await apiService.get(`relatorio/nao-notificados`);

        console.log(response)
        // Verifique se o response é um array e defina as notificações
        if (Array.isArray(response)) {
          setNotificacoes(response);
        } else {
          setNotificacoes([]);
        }
        console.log(notificacoes)
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        setNotificacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  return (
    <div className="notifications-container">
      <div className="notifications-container-header">
        <h2>
          <img
            className="icon-overview"
            src="https://cdn-icons-png.freepik.com/128/874/874569.png"
            alt="Ícone de Notificações"
          />
          Notificações
        </h2>
      </div>
      <div className="notifications">
        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            '&::-webkit-scrollbar': {
              width: '10px',
              backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F5F5F5',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#73b8f5',
              borderRadius: '10px',
            },
          }}
        >
          {loading ? (
            <p>Carregando notificações...</p>
          ) : notificacoes.length > 0 ? (
            <List>
              {notificacoes.map((notificacao, index) => (
                <ListItem key={index} divider>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
        
                    <h4 style={{ color: '#7ad487' }}>
                        <MdMood className="icon" style={{ color: '#7ad487' }} />{' '}
                        {notificacao.aluno.nome} concluiu a atividade
                      </h4>

                    {/* Chips abaixo do texto da notificação */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                      <Chip
                        sx={{ fontFamily: 'Coming Soon' }}
                        label={notificacao.dataConclusao || 'Data não disponível'}
                        className="pill-notification"
                      />
                      <Chip
                        sx={{ fontFamily: 'Coming Soon' }}
                        label={notificacao.tipoAtividade || 'Atividade não especificada'}
                        className="pill-notification"
                      />
                      <Chip
                        sx={{ fontFamily: 'Coming Soon' }}
                        label={notificacao.aluno.turma?.nome || 'Turma não especificada'}
                        className="pill-notification"
                      />
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <p>Nenhuma notificação encontrada.</p>
          )}
        </Box>
      </div>
    </div>
  );
};

export default NotificacoesCard;
