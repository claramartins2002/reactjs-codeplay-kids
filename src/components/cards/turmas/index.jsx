import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import alfabeto from '../../../img/cubes_cover.png';
import geometric from '../../../img/shapes_cover.png';
import numeros from '../../../img/numbers_cover.png';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import './styles.css';

function TurmasCard() {
  const turmas = [
    { id: 1, nome: '1º ano A', periodo: '1° bimestre', alunos: [
      { id: 1, name: 'Maria Leticia da Silva', status: 'Online há 10 minutos', statusColor: 'orange' },
      { id: 2, name: 'João Pedro Amorim', status: 'Online há 1 dia', statusColor: 'blue' },
      { id: 3, name: 'Gabriel dos Santos', status: 'Online agora', statusColor: 'green' },
      { id: 4, name: 'Joana Cesquim Moraes', status: 'Online há 2 horas', statusColor: 'purple' },
    ]},
    { id: 2, nome: '1º ano C', periodo: '3° bimestre', },
    { id: 3, nome: '2º ano B', periodo: '4° bimestre', },
    { id: 4, nome: '2º ano D', periodo: '2° bimestre', },
    { id: 5, nome: '3º ano A', periodo: '1° bimestre', }
  ];

  const cores = [
    '#90CAF9',
    '#CE93D8',
    '#F48FB1',
    '#9FA8DA',
    '#81D4FA',
    '#A5D6A7',
    '#FFE082'
  ];

  const imagens = [
    alfabeto,
    geometric,
    numeros
  ];

  const gerarImagemRandomica = () => {
    const index = Math.floor(Math.random() * imagens.length);
    return imagens[index];
  };

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {turmas.map((turma, index) => (
        <MDBCol key={index}>
          <MDBCard className='w-100 hover-shadow' style={{ 
            backgroundColor: cores[Math.floor(Math.random() * cores.length)], 
            borderRadius: '1rem', 
            maxWidth: '400px', 
            margin: '20px auto' 
          }}>
            <MDBCardBody>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 id='h2-turma' style={{ margin: 0 }}>{turma.nome}</h2>
                <img src={gerarImagemRandomica()} alt="Imagem Randômica" style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
              </div>
              <MDBCardText style={{ color: '#FFF', fontSize: '14pt', fontFamily: 'Irish Grover', marginTop: '10px' }}>
                {turma.periodo}
              </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
              <NavLink to={`/turmas/${turma.id}`} state={{ dataTurma: turma }}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ padding: 0 }}>
                  <IoArrowForwardCircleOutline style={{ color: '#FFF', fontSize: '30pt' }} />
                </MDBBtn>
              </NavLink>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
}

export default TurmasCard;
