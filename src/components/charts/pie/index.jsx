import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ['Matemática', 'Português', 'Raciocínio Lógico'],
    datasets: [
      {
        label: 'Número de Atividades',
        data: [10, 15, 7], 
        backgroundColor: [
          'rgb(252,111,169)', 
          'rgb(139,235,227)', 
          'rgb(253,236,176)', 
        ],
        borderWidth: 0,
      },
    ],
  };

  // Opções de configuração do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permitir controle manual da altura e largura

        plugins: {
      legend: {
        position: 'top', // Posição da legenda
      },
      title: {
        display: true,
        text: 'Atividades Lançadas por Matéria', // Título do gráfico
      },
    },
  };

  return   <div style={{ width: '600px', height: '300px', margin: '3%', backgroundColor: 'white'}}> {/* Definindo tamanho personalizado */}
  <Pie data={data} options={options} />
</div>
}

export default PieChart;
