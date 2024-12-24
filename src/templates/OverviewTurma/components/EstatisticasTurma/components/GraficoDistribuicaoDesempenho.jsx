import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import InfoTooltip from './InfoTooltip';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const GraficoDistribuicaoDesempenho = ({ relatorios }) => {
  const dadosProcessados = relatorios.map(relatorio => ({
    x: relatorio.tempoGasto,
    y: relatorio.pontuacao,
    label: relatorio.atividade.nome
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Relação Tempo x Pontuação',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return `${point.label}: ${point.y} pontos em ${point.x}s`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo (segundos)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Pontuação'
        }
      }
    }
  };

  const data = {
    datasets: [{
      data: dadosProcessados,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <InfoTooltip text="Relaciona o tempo gasto com a pontuação obtida em cada atividade, permitindo identificar padrões de eficiência." />
      <Scatter options={options} data={data} />
    </div>
  );
};

export default GraficoDistribuicaoDesempenho; 