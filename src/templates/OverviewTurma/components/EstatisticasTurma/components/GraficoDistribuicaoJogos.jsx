import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const COLORS_JOGOS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

const GraficoDistribuicaoJogos = ({ dadosJogos }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribuição por Jogos',
        font: {
          size: 16
        }
      },
    },
  };

  const data = {
    labels: dadosJogos.map(item => item.name),
    datasets: [
      {
        data: dadosJogos.map(item => item.valor),
        backgroundColor: COLORS_JOGOS,
      },
    ],
  };

  return (
    <div className="grafico">
      <Pie options={options} data={data} />
    </div>
  );
};

export default GraficoDistribuicaoJogos; 