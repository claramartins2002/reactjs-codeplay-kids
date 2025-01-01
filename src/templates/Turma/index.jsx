import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React from 'react';
import {MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MdEdit, MdInfo } from 'react-icons/md';
import iconeMenina from '../../img/icone-menina.png'; // Importe a imagem diretamente
import './styles.css';
function ListaDeAlunos() {
  const alunos = [
    { nome: 'João', ultimaVezOnline: '10 min atrás', imagem: iconeMenina },
    { nome: 'Maria', ultimaVezOnline: '1 hora atrás', imagem: iconeMenina },
    { nome: 'Pedro', ultimaVezOnline: '2 dias atrás', imagem: iconeMenina}
  ];

  return (
    <MDBListGroup>
      {alunos.map((aluno, index) => (
        <MDBListGroupItem key={index} className="d-flex align-items-center justify-content-between">
          <img
            src={aluno.imagem}
            alt={aluno.nome}
            className="rounded-circle"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />

          <div className="ms-3" style={{ flexGrow: 1 }}>
            <h6 className="mb-1">{aluno.nome}</h6>
            <small className="text-muted">Última vez online: {aluno.ultimaVezOnline}</small>
          </div>

          <div>
            <MdInfo size={24} className="me-3" style={{ cursor: 'pointer' }} />
            <MdEdit size={24} style={{ cursor: 'pointer' }} />
          </div>
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
}

export default ListaDeAlunos;
