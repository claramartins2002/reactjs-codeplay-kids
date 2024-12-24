import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import InfoTooltip from './InfoTooltip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoRankingDificuldade = ({ relatorios }) => {
  // Calcula taxa de erro por atividade
  const taxaErroPorAtividade = relatorios.reduce((acc, relatorio) => {
    const atividadeId = relatorio.atividade.id;
    if (!acc[atividadeId]) {
      acc[atividadeId] = {
        nome: relatorio.atividade.nome,
        erros: 0,
        total: 0
      };
    }
    acc[atividadeId].erros += relatorio.erros;
    acc[atividadeId].total += (relatorio.acertos + relatorio.erros);
    return acc;
  }, {});

  const dadosProcessados = Object.values(taxaErroPorAtividade)
    .map(atividade => ({
      nome: atividade.nome,
      taxaErro: (atividade.erros / atividade.total) * 100
    }))
    .sort((a, b) => b.taxaErro - a.taxaErro); // Ordena por taxa de erro decrescente

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ranking de Dificuldade por Atividade',
        font: { size: 16 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Taxa de Erro (%)'
        }
      }
    }
  };

  const data = {
    labels: dadosProcessados.map(item => item.nome),
    datasets: [{
      data: dadosProcessados.map(item => item.taxaErro),
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    }]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <InfoTooltip text="Mostra quais atividades têm maior taxa de erro, ajudando a identificar conteúdos que precisam ser reforçados." />
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficoRankingDificuldade; 