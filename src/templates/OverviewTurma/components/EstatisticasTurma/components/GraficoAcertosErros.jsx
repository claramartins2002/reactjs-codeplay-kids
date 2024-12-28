import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import InfoTooltip from './InfoTooltip';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const GraficoAcertosErros = ({ relatorios }) => {
  const [operacaoSelecionada, setOperacaoSelecionada] = useState('todas');

  // Obtém lista única de operações matemáticas
  const operacoes = [...new Set(relatorios.map(r => r.atividade.jogo.nome))].sort();

  // Calcula acertos e erros com base na operação selecionada
  const calcularAcertosErros = () => {
    const relatoriosFiltrados = operacaoSelecionada === 'todas' 
      ? relatorios
      : relatorios.filter(r => r.atividade.jogo.nome === operacaoSelecionada);

    return relatoriosFiltrados.reduce((acc, relatorio) => ({
      acertos: acc.acertos + relatorio.acertos,
      erros: acc.erros + relatorio.erros
    }), { acertos: 0, erros: 0 });
  };

  const { acertos, erros } = calcularAcertosErros();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Acertos vs Erros ${operacaoSelecionada !== 'todas' ? `- ${operacaoSelecionada}` : ''}`,
        font: {
          size: 16,
          family: 'Coming Soon'
        },
        padding: {
          bottom: 10
        }
      },
    },
    maintainAspectRatio: true,
    aspectRatio: 2,
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    }
  };

  const data = {
    labels: ['Acertos', 'Erros'],
    datasets: [
      {
        data: [acertos, erros],
        backgroundColor: ['#00C49F', '#FF8042'],
        circumference: 360,
        radius: '85%',
      },
    ],
  };

  return (
    <div className="grafico grafico-pequeno" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <InfoTooltip text="Apresenta a proporção entre acertos e erros nas atividades matemáticas." />
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
            width: '90%'
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
      <Pie options={options} data={data} />
    </div>
  );
};

export default GraficoAcertosErros;