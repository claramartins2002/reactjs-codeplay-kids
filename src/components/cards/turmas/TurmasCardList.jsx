import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardFooter, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import alfabeto from '../../../img/cubes_cover.png';
import geometric from '../../../img/shapes_cover.png';
import numeros from '../../../img/numbers_cover.png';
import ColorUtils from '../../../utils/Colors';
import './styles.css';

const TurmaCardList = ({ turmas }) => {
  const imagens = [alfabeto, geometric, numeros];

  // Gerar uma cor e imagem aleatória para cada turma uma única vez
  const coresTurmas = useMemo(() => turmas.map(() => ColorUtils.getRandomColor(200)), [turmas]);
  const imagensTurmas = useMemo(() => turmas.map(() => imagens[Math.floor(Math.random() * imagens.length)]), [turmas]);

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      {turmas.map((turma, index) => (
        <MDBCol key={turma.id}>
          <MDBCard className='w-100 hover-shadow' style={{
            backgroundColor: coresTurmas[index],
            borderRadius: '1rem',
            maxWidth: '400px',
            margin: '20px auto'
          }}>
            <MDBCardBody>
              <div className='turmas-card-body'>
                <h2 id='h2-turma' style={{ margin: 0 }}>{turma.nome}</h2>
                <img src={imagensTurmas[index]} alt="Imagem Randômica" style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
              </div>
              <MDBCardText style={{ color: '#FFF', fontSize: '14pt', fontFamily: 'Irish Grover', marginTop: '10px' }}>
                {turma.descricao}
              </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
              <NavLink to={`/turmas/${turma.id}`} state={{ dataTurma: turma }}>
                <IconButton aria-label="navigate to class">
                  <ArrowCircleRightOutlinedIcon sx={{color: '#FFF', fontSize: '30px'}}/>
                </IconButton>
              </NavLink>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
};

export default TurmaCardList;
