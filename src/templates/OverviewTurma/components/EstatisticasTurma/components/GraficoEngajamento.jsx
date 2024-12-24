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

const GraficoEngajamento = ({ relatorios, alunos }) => {
  // Conta atividades por aluno
  const atividadesPorAluno = alunos.map(aluno => {
    const quantidadeAtividades = relatorios.filter(r => r.aluno.id === aluno.id).length;
    return {
      nome: aluno.nome,
      quantidade: quantidadeAtividades
    };
  }).sort((a, b) => b.quantidade - a.quantidade);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Engajamento por Aluno',
        font: { size: 16 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Atividades Realizadas'
        }
      }
    }
  };

  const data = {
    labels: atividadesPorAluno.map(item => item.nome),
    datasets: [{
      data: atividadesPorAluno.map(item => item.quantidade),
      backgroundColor: 'rgba(153, 102, 255, 0.7)',
    }]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <InfoTooltip text="Apresenta a quantidade de atividades realizadas por cada aluno, indicando o nível de participação individual." />
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficoEngajamento; 