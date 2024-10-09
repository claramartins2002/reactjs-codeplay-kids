import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar os elementos necessários
Chart.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    labels: ['Finalizada', 'Não finalizada'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: [
          'rgba(219, 174, 255, 1)',
          'rgba(255, 255, 255, 0.2)'
        ],
        borderColor: [
          'rgba(219, 174, 255, 0.2)',
          'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {title: {
      display: true, 
      text: 'Atividades finalizadas - 70%',
      font: {
        size: 18, // Tamanho da fonte
        family: 'Irish Grover', // Fonte
      }},
      legend: {
        display: false
      },
    },
    maintainAspectRatio: false, // Permite customização de tamanho
  };

  return (
    <div style={{ width: '40%', height: '50%', backgroundColor: 'white', margin: '1%'}}> 
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
