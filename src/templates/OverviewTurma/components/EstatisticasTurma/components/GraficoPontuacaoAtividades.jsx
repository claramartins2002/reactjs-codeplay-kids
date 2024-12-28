import { useState } from 'react';
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
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import InfoTooltip from './InfoTooltip';

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
  const [operacaoSelecionada, setOperacaoSelecionada] = useState('todas');

  // Obtém lista única de operações matemáticas
  const operacoes = [...new Set(relatorios.map(r => r.atividade.jogo.nome))].sort();

  // Filtra relatórios pela operação selecionada
  const relatoriosFiltrados = operacaoSelecionada === 'todas'
    ? relatorios
    : relatorios.filter(r => r.atividade.jogo.nome === operacaoSelecionada);

  // Agrupa relatórios por ID da atividade e calcula a média de pontuação
  const mediasPorAtividade = relatoriosFiltrados.reduce((acc, relatorio) => {
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

  const dadosProcessados = Object.entries(mediasPorAtividade)
    .map(([id, dados]) => ({
      nome: dados.nome,
      mediaPontuacao: dados.pontuacoes.reduce((a, b) => a + b, 0) / dados.pontuacoes.length
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Média de Pontuação por Atividade ${operacaoSelecionada !== 'todas' ? `- ${operacaoSelecionada}` : ''}`,
        font: {
          size: 16,
          family: 'Coming Soon'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Pontuação: ${context.raw.toFixed(1)} pontos`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pontuação',
          font: {
            family: 'Coming Soon'
          }
        }
      }
    }
  };

  const data = {
    labels: dadosProcessados.map(item => item.nome),
    datasets: [
      {
        data: dadosProcessados.map(item => item.mediaPontuacao),
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <InfoTooltip text="Mostra a média de pontuação obtida em cada atividade." />
      </div>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="operacao-select-label">Operação Matemática</InputLabel>
        <Select
          labelId="operacao-select-label"
          value={operacaoSelecionada}
          label="Operação Matemática"
          onChange={(e) => setOperacaoSelecionada(e.target.value)}
          sx={{
            fontFamily: 'Coming Soon',
            backgroundColor: 'white',
            '& .MuiSelect-select': {
              paddingY: 1
            },
            width: '70%'
          }}
        >
          <MenuItem value="todas" sx={{ fontFamily: 'Coming Soon' }}>
            Todas as Operações
          </MenuItem>
          {operacoes.map((operacao) => (
            <MenuItem 
              key={operacao} 
              value={operacao}
              sx={{ fontFamily: 'Coming Soon' }}
            >
              {operacao}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Line options={options} data={data} />
    </div>
  );
};

export default GraficoPontuacaoAtividades; 