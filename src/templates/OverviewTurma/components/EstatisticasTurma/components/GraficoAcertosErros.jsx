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
  const [atividadeSelecionada, setAtividadeSelecionada] = useState('todas');

  // Obtém lista única de atividades
  const atividades = [...new Set(relatorios.map(r => r.atividade.id))].map(id => {
    const relatorio = relatorios.find(r => r.atividade.id === id);
    return {
      id: id,
      nome: relatorio.atividade.nome
    };
  });

  // Calcula acertos e erros com base na atividade selecionada
  const calcularAcertosErros = () => {
    const relatoriosFiltrados = atividadeSelecionada === 'todas' 
      ? relatorios
      : relatorios.filter(r => r.atividade.id === atividadeSelecionada);

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
        text: 'Acertos vs Erros',
        font: {
          size: 16
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
      <InfoTooltip text="Apresenta a proporção entre acertos e erros nas atividades." />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="atividade-select-label">Atividade</InputLabel>
        <Select
          labelId="atividade-select-label"
          value={atividadeSelecionada}
          label="Atividade"
          onChange={(e) => setAtividadeSelecionada(e.target.value)}
          sx={{
            fontFamily: 'Coming Soon',
            backgroundColor: 'white',
            '& .MuiSelect-select': {
              paddingY: 1
            }
          }}
        >
          <MenuItem value="todas" sx={{ fontFamily: 'Coming Soon' }}>
            Todas as Atividades
          </MenuItem>
          {atividades.map((atividade) => (
            <MenuItem 
              key={atividade.id} 
              value={atividade.id}
              sx={{ fontFamily: 'Coming Soon' }}
            >
              {atividade.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pie options={options} data={data} />
    </div>
  );
};

export default GraficoAcertosErros; 