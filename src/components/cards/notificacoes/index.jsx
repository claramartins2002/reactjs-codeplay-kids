import React from 'react';
import { Card, List, ListItem, ListItemText, Box, Chip } from '@mui/material';
import './styles.css';
import { MdMood, MdMoodBad } from "react-icons/md";

function NotificacoesCard() {
  const notificacoes = [
    { aluno: 'João', concluido: true, atividade: 'Estudo de Matemática' , turma: '3º ano C', data: '18 Jun, 2024'},
    { aluno: 'Maria', concluido: false, atividade: 'Revisão de Português', turma: '2º ano B', data: '14 Jun, 2024' },
    { aluno: 'Carlos', concluido: true, atividade: 'Exercícios de Raciocínio Lógico', turma: '2º ano A',  data: '14 Jun, 2024' },
    { aluno: 'Miguel', concluido: false, atividade: 'Quebra Cabeça', turma: '2º ano A',  data: '21 Ago, 2024' },
    { aluno: 'Sérgio', concluido: true, atividade: 'Palavras Cruzadas', turma: '3º ano B',  data: '01 Dez, 2024' },
  ];

  return (
    <>    
      <div className="notifications-container">
        <div className="notifications-container-header">
          <h2>Notificações</h2>
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
              borderRadius: '10px'
            },
          }}
        >
          <List>
            {notificacoes.map((notificacao, index) => (
              <ListItem key={index} divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
                  {notificacao.concluido ? (
                    <h4 style={{ color: "#7ad487", margin: "left" }}>
                      <MdMood className="icon" style={{ color: "#7ad487" }} /> {notificacao.aluno} concluiu a atividade
                    </h4>
                  ) : (
                    <h4 style={{ color: "#e85050", margin: "left" }}>
                      <MdMoodBad className="icon" style={{ color: "#e85050" }} /> {notificacao.aluno} não concluiu a atividade
                    </h4>
                  )}

                  {/* Chips abaixo do texto da notificação */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                    <Chip sx={{fontFamily: 'Coming Soon'}} label={notificacao.data} className="pill-notification" />
                    <Chip sx={{fontFamily: 'Coming Soon'}} label={notificacao.atividade} className="pill-notification" />
                    <Chip sx={{fontFamily: 'Coming Soon'}} label={notificacao.turma} className="pill-notification" />
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        </div>
      </div>
    </>
  );
}

export default NotificacoesCard;
