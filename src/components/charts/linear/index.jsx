import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
 
  stacked: false,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14, // Tamanho da fonte da legenda
          family: 'Irish Grover', // Fonte da legenda
        }}},
    title: {
      display: true,
      text: 'Frequência de acesso dos alunos',
      font: {
        family:'Irish Grover',
        size: 24
      }
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

export const data = {
  labels,
  datasets: [
    {
      label: '3° ano',
      data: [29,45,22,23,55,65, 29],
      borderColor: 'rgb(253,236,176)',
      backgroundColor: 'rgba(253, 236, 176, 0.5)',
      yAxisID: 'y',
    },
    {
      label: '2° ano',
      data:  [5,15,22,43,55,60, 39],
      borderColor: 'rgb(223,239,255)',
      backgroundColor: 'rgba(223, 239, 255, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

export function LinearChart() {
  return <Line options={options} data={data} style={{ backgroundColor: 'white' }} />;
}
