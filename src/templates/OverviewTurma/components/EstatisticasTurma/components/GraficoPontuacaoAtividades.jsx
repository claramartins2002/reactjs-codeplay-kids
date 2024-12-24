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

const GraficoPontuacaoAtividades = ({ relatorios }) => {
  // Agrupa relatórios por ID da atividade e calcula a média de pontuação
  const mediasPorAtividade = relatorios.reduce((acc, relatorio) => {
    const atividadeId = relatorio.atividade.id;
    if (!acc[atividadeId]) {
      acc[atividadeId] = {
        nome: relatorio.atividade.nome,
        pontuacoes: [],
      };
    }
    acc[atividadeId].pontuacoes.push(relatorio.pontuacao);
    return acc;
  }, {});

  // Calcula a média de pontuação para cada atividade
  const dadosProcessados = Object.entries(mediasPorAtividade).map(([id, dados]) => ({
    nome: dados.nome,
    mediaPontuacao: dados.pontuacoes.reduce((a, b) => a + b, 0) / dados.pontuacoes.length
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
        text: 'Média de Pontuação por Atividade',
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
          text: 'Pontuação'
        }
      }
    }
  };

  const data = {
    labels: dadosProcessados.map(item => item.nome),
    datasets: [
      {
        label: 'Pontuação Média',
        data: dadosProcessados.map(item => item.mediaPontuacao),
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
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

export default GraficoPontuacaoAtividades; 