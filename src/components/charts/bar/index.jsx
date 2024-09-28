import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const data = {
    labels: ['Matemática', 'Português', 'Raciocínio Lógico'],
    datasets: [
      {
        label: 'Acertos',
        data: [15, 20, 10], 
        backgroundColor: 'rgb(115,184,245)', 
      },
      {
        label: 'Erros',
        data: [5, 3, 7], 
        backgroundColor: 'rgb(232,80,80)'
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
            font: {
              size: 14, // Tamanho da fonte da legenda
              family: 'Irish Grover', // Fonte da legenda
            }},
        position: 'top', 
      },
      title: {
        display: true,
        font: {
            size: 18, // Tamanho da fonte
            family: 'Irish Grover', // Fonte
          },
        text: 'Desempenho por Matéria', 
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return <Bar data={data} options={options} style={{ backgroundColor: 'white' }} />;
}

export default BarChart;
