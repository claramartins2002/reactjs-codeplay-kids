import React from 'react';
import {
  MDBCard,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import './styles.css';
import { MdMood, MdMoodBad } from "react-icons/md";

function NotificacoesCard() {
  const notificacoes = [
    { aluno: 'João', concluido: true, atividade: 'Estudo de Matemática' , turma: '3º ano C', data: '18 Jun, 2024'},
    { aluno: 'Maria', concluido: false, atividade: 'Revisão de Português', turma: '2º ano B', data: '14 Jun, 2024' },
    { aluno: 'Carlos', concluido: true, atividade: 'Exercícios de Raciocínio Lógico', turma: '2º ano A',  data: '14 Jun, 2024' },
  ];

  return (<>    

    <MDBCard className="w-100 h-100" id="container-notificacoes-card">
    <h2 className="fw-bold mb-2 text-left" id="h2-txt-notificacoes-card">Notificações</h2> 
      <MDBListGroup flush style={{border: 'none'}}>
        {notificacoes.map((notificacao, index) => (
          <MDBListGroupItem key={index} >
             <span>
              <button className='pill-notification'>
                {notificacao.data}
              </button>
              <button className='pill-notification'>
                {notificacao.atividade}
              </button>
              <button className='pill-notification'>
                {notificacao.turma}
              </button>
            </span>
            {notificacao.concluido ? (
                  <>
                   <h4 style={{color: "#7ad487", margin: "auto"}}><MdMood className="icon" style={{color: "#7ad487"}}/> {notificacao.aluno} concluiu a atividade </h4></> 

              ) : (
                <>
                 <h4 style={{color: "#e85050", margin: "auto"}}><MdMoodBad  className="icon" style={{color: "#e85050"}}/> {notificacao.aluno} não concluiu a atividade </h4></> 

              )}
        
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
    </>
  );
}

export default NotificacoesCard;
