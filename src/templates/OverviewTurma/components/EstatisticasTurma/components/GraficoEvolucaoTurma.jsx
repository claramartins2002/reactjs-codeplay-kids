import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import InfoTooltip from './InfoTooltip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoEvolucaoTurma = ({ relatorios }) => {
  // Agrupa relatórios por data e calcula média
  const mediasPorData = relatorios.reduce((acc, relatorio) => {
    const data = new Date(relatorio.dataRealizacao).toLocaleDateString();
    if (!acc[data]) {
      acc[data] = {
        pontuacoes: [],
        media: 0
      };
    }
    acc[data].pontuacoes.push(relatorio.pontuacao);
    return acc;
  }, {});

  // Calcula médias
  Object.keys(mediasPorData).forEach(data => {
    const pontuacoes = mediasPorData[data].pontuacoes;
    mediasPorData[data].media = pontuacoes.reduce((a, b) => a + b, 0) / pontuacoes.length;
  });

  const dadosOrdenados = Object.entries(mediasPorData)
    .sort(([dataA], [dataB]) => new Date(dataA) - new Date(dataB));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Evolução da Média da Turma',
        font: { size: 16 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Média de Pontuação'
        }
      }
    }
  };

  const data = {
    labels: dadosOrdenados.map(([data]) => data),
    datasets: [{
      label: 'Média da Turma',
      data: dadosOrdenados.map(([, dados]) => dados.media),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3
    }]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <InfoTooltip text="Acompanha a evolução da média de pontuação da turma ao longo do tempo, permitindo visualizar o progresso coletivo." />
      <Line options={options} data={data} />
    </div>
  );
};

export default GraficoEvolucaoTurma; 