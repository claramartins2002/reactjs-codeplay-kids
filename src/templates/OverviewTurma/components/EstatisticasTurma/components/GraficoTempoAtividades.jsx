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

const GraficoTempoAtividades = ({ relatorios }) => {
  const [operacaoSelecionada, setOperacaoSelecionada] = useState('todas');

  // Obtém lista única de operações matemáticas
  const operacoes = [...new Set(relatorios.map(r => r.atividade.jogo.nome))].sort();

  // Filtra relatórios pela operação selecionada
  const relatoriosFiltrados = operacaoSelecionada === 'todas'
    ? relatorios
    : relatorios.filter(r => r.atividade.jogo.nome === operacaoSelecionada);

  // Agrupa relatórios por ID da atividade e calcula a média de tempo
  const mediasPorAtividade = relatoriosFiltrados.reduce((acc, relatorio) => {
    const atividadeId = relatorio.atividade.id;
    if (!acc[atividadeId]) {
      acc[atividadeId] = {
        nome: relatorio.atividade.nome,
        tempos: [],
      };
    }
    acc[atividadeId].tempos.push(relatorio.tempoGasto);
    return acc;
  }, {});

  const dadosProcessados = Object.entries(mediasPorAtividade)
    .map(([id, dados]) => ({
      nome: dados.nome,
      mediaTempoGasto: dados.tempos.reduce((a, b) => a + b, 0) / dados.tempos.length
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
        text: `Média de Tempo por Atividade ${operacaoSelecionada !== 'todas' ? `- ${operacaoSelecionada}` : ''}`,
        font: {
          size: 16,
          family: 'Coming Soon'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Tempo: ${context.raw.toFixed(1)} segundos`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tempo (segundos)',
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
        data: dadosProcessados.map(item => item.mediaTempoGasto),
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.5)',
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  return (
    <div className="grafico" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <InfoTooltip text="Mostra o tempo gasto pelos alunos em cada atividade, contabilizado em segundos." />
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

export default GraficoTempoAtividades; 