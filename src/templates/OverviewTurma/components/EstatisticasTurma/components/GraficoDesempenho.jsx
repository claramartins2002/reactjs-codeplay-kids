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

const GraficoDesempenho = ({ dadosDesempenho }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Desempenho Geral',
        font: {
          size: 16
        }
      },
    },
  };

  const data = {
    labels: dadosDesempenho.map(item => item.name),
    datasets: [
      {
        label: 'Valor',
        data: dadosDesempenho.map(item => item.valor),
        backgroundColor: '#8884d8',
      },
    ],
  };

  return (
    <div className="grafico grafico-pequeno" style={{ position: 'relative' }}>
      <InfoTooltip text="Mostra o desempenho geral dos alunos nas atividades." />
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficoDesempenho; 