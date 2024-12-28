import { useEffect } from 'react';
import './EstatisticasTurma.css';
import CircularIndeterminate from '../../../../components/Carregando';
import GraficoDesempenho from './components/GraficoDesempenho';
import GraficoAcertosErros from './components/GraficoAcertosErros';
import GraficoDistribuicaoJogos from './components/GraficoDistribuicaoJogos';
import GraficoTempoAtividades from './components/GraficoTempoAtividades';
import GraficoPontuacaoAtividades from './components/GraficoPontuacaoAtividades';
import GraficoRankingDificuldade from './components/GraficoRankingDificuldade';
import GraficoEngajamento from './components/GraficoEngajamento';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  calcularMediaAcertosErros,
  calcularMediaTempoGasto,
  calcularMediaPontuacao,
  calcularQuantidadePorJogo
} from './utils/calculosEstatisticas';
import useFetchRelatorios from '../../../../utils/hooks/useFetchRelatorios';
import useFetchTurma from '../../../../utils/hooks/useFetchTurma';
import useFetchAtividades from '../../../../utils/hooks/useFetchAtividades';

const EstatisticasTurma = ({ turmaId }) => {
  const { relatorios, fetchRelatoriosByTurma } = useFetchRelatorios();
  const { loading, error, turma, alunos } = useFetchTurma(turmaId);
  const { atividades, fetchAtividadesByTurma } = useFetchAtividades();

  useEffect(() => {
    fetchRelatoriosByTurma(turmaId);
    fetchAtividadesByTurma(turmaId);
  }, [fetchRelatoriosByTurma, fetchAtividadesByTurma, turmaId]);

  const relatoriosMatematica = relatorios.filter(relatorio => 
    relatorio.tipoAtividade === 'Operações Matemáticas'
  );

  const mediaAcertosErros = calcularMediaAcertosErros(relatoriosMatematica);
  const mediaTempoGasto = calcularMediaTempoGasto(relatoriosMatematica);
  const mediaPontuacao = calcularMediaPontuacao(relatoriosMatematica);

  const dadosDesempenhoMatematica = [
    { name: 'Tempo Médio (segundos)', valor: mediaTempoGasto },
    { name: 'Média de Pontuação', valor: mediaPontuacao },
  ];

  const dadosJogos = calcularQuantidadePorJogo(atividades);

  return (
    <div className="estatisticas-container">
      {loading ? (
        <CircularIndeterminate/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="info-basica">
            <div className="quantidade-alunos-turma">
              <span className="texto-info-basica"><GroupOutlinedIcon /> Alunos</span>
              <span className="texto-info-basica">{alunos.length}</span>
            </div>
            <div className="quantidade-atividades-turma">
              <span className="texto-info-basica"><MenuBookOutlinedIcon/> Atividades</span>
              <span className="texto-info-basica">{atividades.length}</span>
            </div>
          </div>

          <div className="graficos-container">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="matematica-content"
                id="matematica-header"
              >
                <Typography sx={{ fontFamily: 'Coming Soon', fontSize: '1.2rem' }}>
                  Matemática
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="graficos-matematica">
                  <GraficoDesempenho dadosDesempenho={dadosDesempenhoMatematica} />
                  <GraficoAcertosErros relatorios={relatoriosMatematica} />
                  <GraficoTempoAtividades relatorios={relatoriosMatematica} />
                  <GraficoPontuacaoAtividades relatorios={relatoriosMatematica} />
                  <GraficoRankingDificuldade relatorios={relatoriosMatematica} />
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="geral-content"
                id="geral-header"
              >
                <Typography sx={{ fontFamily: 'Coming Soon', fontSize: '1.2rem' }}>
                  Visão Geral da Turma
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="graficos-gerais">
                  <GraficoEngajamento relatorios={relatorios} alunos={alunos} />
                  <GraficoDistribuicaoJogos dadosJogos={dadosJogos} />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      )}
    </div>
  );
};

export default EstatisticasTurma;