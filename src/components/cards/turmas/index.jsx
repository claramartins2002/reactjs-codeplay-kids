import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import alfabeto from '../../../img/alfabeto-cover.png';
import geometric from '../../../img/geometric-shapes-cover.png';
import numeros from '../../../img/numeros-cover.png';
import { MdMoreVert } from "react-icons/md";

import './styles.css';
function TurmasCard() {
  const turmas = [
    { nome: '1º ano A' },
    { nome: '1º ano C' },
    { nome: '2º ano B' },
    { nome: '2º ano D' },
    { nome: '3º ano A' }
  ];

  const cores = [
    '#73b8f5',
    '#ec756f',
    '#b270a8',
    '#738ef5'
  ]

  // Lista de URLs de imagens randômicas
  const imagens = [
    alfabeto,
    geometric,
    numeros
  ];

  // Função para pegar uma imagem aleatória da lista
  const gerarImagemRandomica = () => {
    const index = Math.floor(Math.random() * imagens.length);
    return imagens[index];
  };

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {turmas.map((turma, index) => (
        <MDBCol key={index}>
          <MDBCard style={{ borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '400px', margin: '20px auto' }}>
            <MDBCardBody style={{padding: '0'}}>
            <div style={{display: 'flex', alignItems: 'center', backgroundColor: cores[Math.floor(Math.random() * cores.length)]}}>
            <h2 id='h2-turma'>{turma.nome}</h2>

            <img src={gerarImagemRandomica()} alt="Imagem Randômica" />
              </div>

              <MDBCardText style={{ marginTop: '10px', color: 'grey', fontSize: '17pt', fontFamily: 'Irish Grover', padding: '3%', textAlign: 'center'}}>
                4º Semestre/2024
              </MDBCardText>
              <MDBCardText style={{ borderTop: '1px solid grey', padding: '3%'}}>
              <MdMoreVert style={{marginLeft: '80%', color: 'grey', fontSize: '30pt'}}/>

              </MDBCardText>
            </MDBCardBody>

          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
}

export default TurmasCard;
