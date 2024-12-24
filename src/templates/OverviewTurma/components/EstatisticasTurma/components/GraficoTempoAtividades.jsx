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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoTempoAtividades = ({ relatorios }) => {
  // Agrupa relatórios por ID da atividade e calcula a média de tempo
  const mediasPorAtividade = relatorios.reduce((acc, relatorio) => {
    const atividadeId = relatorio.atividade.id;
    if (!acc[atividadeId]) {
      acc[atividadeId] = {
        nome: relatorio.atividade.nome,
        tempos: [],
      };
    }
    acc[atividadeId].tempos.push(relatorio.tempoGasto);
    return acc;
  }, {});

  // Calcula a média de tempo para cada atividade
  const dadosProcessados = Object.entries(mediasPorAtividade).map(([id, dados]) => ({
    nome: dados.nome,
    mediaTempoGasto: dados.tempos.reduce((a, b) => a + b, 0) / dados.tempos.length
  }));

  // Ordena por nome da atividade para melhor visualização
  dadosProcessados.sort((a, b) => a.nome.localeCompare(b.nome));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Média de Tempo por Atividade',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tempo (segundos)'
        }
      }
    }
  };

  const data = {
    labels: dadosProcessados.map(item => item.nome),
    datasets: [
      {
        label: 'Tempo Médio',
        data: dadosProcessados.map(item => item.mediaTempoGasto),
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.5)',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="grafico">
      <Line options={options} data={data} />
    </div>
  );
};

export default GraficoTempoAtividades; 