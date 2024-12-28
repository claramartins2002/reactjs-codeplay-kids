import { useEffect } from 'react';
import './RelatoriosAtividade.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import useFetchRelatorios from '../../../../utils/hooks/useFetchRelatorios';
import useFetchTurma from '../../../../utils/hooks/useFetchTurma';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ListaAlunosAtividade from './components/ListaAlunosAtividade';

const RelatoriosAtividades = ({ atividade, onClose }) => {
  const { relatorios, fetchRelatoriosByAtividade } = useFetchRelatorios();
  const { turma, alunos } = useFetchTurma(atividade.turma.id);

  useEffect(() => {
    fetchRelatoriosByAtividade(atividade.id);
  }, [fetchRelatoriosByAtividade, atividade]);

  // Calcula a média de pontuação
  const calcularMediaPontuacao = () => {
    if (relatorios.length === 0) return 0;
    const soma = relatorios.reduce((acc, rel) => acc + rel.pontuacao, 0);
    return (soma / relatorios.length).toFixed(1);
  };

  // Calcula a porcentagem de alunos que finalizaram
  const calcularPorcentagemFinalizacao = () => {
    if (!alunos || alunos.length === 0) return 0;
    return ((relatorios.length / alunos.length) * 100).toFixed(0);
  };

  console.log(relatorios);

  return (
    <div className="estatisticas-atividade-overlay">
      <div className="estatisticas-atividade-container">
      <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '0',
            top: '0',
            color: '#6c5ce7',
            '&:hover': {
              backgroundColor: 'rgba(108, 92, 231, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className="infos-basicas">
          <div className="title-subtitle-estatistica-atividade">
            <span className='titulo-atividade-nome'>
              {atividade.nome} <br/>
              <p>{atividade.jogo.nome}</p>
            </span>
            <div className="datas-atividade">
              <span>
                <CalendarMonthIcon /> {dayjs(atividade.dataCriacao).format('DD/MM/YYYY')} - {dayjs(atividade.dataEncerramento).format('DD/MM/YYYY')}
              </span>
            </div>
          </div>

          <div className="grid-info">
            <div className="info-card">
              <PermIdentityOutlinedIcon sx={{color: '#c8b7f9', background: '#f2edfd', fontSize: '60px', borderRadius: '50%', padding: '10px'}}/>
              <div>
                <div className="label">Total de Alunos</div>
                <div className="valor">{alunos?.length || 0}</div>
              </div>
            </div>
            
            <div className="info-card">
              <DoneOutlineOutlinedIcon sx={{color: '#c8b7f9', background: '#f2edfd', fontSize: '60px', borderRadius: '50%', padding: '10px'}}/>
              <div>
                <div className="label">Alunos que Finalizaram</div>
                <div className="valor">
                  {relatorios.length} ({calcularPorcentagemFinalizacao()}%)
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <StarBorderOutlinedIcon sx={{color: '#c8b7f9', background: '#f2edfd', fontSize: '60px', borderRadius: '50%', padding: '10px'}}/>
              <div>
                <div className="label">Pontuação Média</div>
                <div className="valor">{calcularMediaPontuacao()}</div>
              </div>
            </div>
          </div>
        </div>

        <ListaAlunosAtividade relatorios={relatorios} />
      </div>
    </div>
  );
};

export default RelatoriosAtividades;