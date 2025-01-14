import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Stack,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { ExpandMore, MenuBookOutlined } from '@mui/icons-material';
import ApiService from '../../../utils/ApiService';
import { styles } from './styles';
import { Line } from 'react-chartjs-2';

const subjectsData = [
  { name: 'Português', color: '#ffebee', fontColor: '#FF8158' },
  { name: 'Matemática', color: '#e8f5e9', fontColor: '#86D718' },
  { name: 'Raciocínio Lógico', color: '#fff8e1', fontColor: '#FFC329' },
];

export const StudentPerformance = ({ student }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await apiService.get(`desempenho/aluno/${student.id}`);
        console.log(response);
        setPerformanceData(response.desempenho || []);
      } catch (error) {
        console.error('Erro ao buscar desempenho:', error);
      }
    };

    fetchPerformance();
  }, [student.id, apiService]);

  const generateSparklineData = (subject) => {
    const subjectData = performanceData?.find((item) => item.tipo === subject.name) || {};
    return {
      labels: subjectData.notas ? subjectData.notas.map((_, index) => `Ativ. ${index + 1}`) : [],
      datasets: [
        {
          label: 'Notas atividades',
          data: subjectData.notas || [],
          borderColor: subject.fontColor,
          backgroundColor: `${subject.fontColor}33`, // Transparência no fundo
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: subject.fontColor,
        },
      ],
    };
  };

  const generateTimeData = (subject) => {
    const subjectData = performanceData?.find((item) => item.tipo === subject.name) || {};
    return {
      labels: subjectData.tempo ? subjectData.tempo.map((_, index) => `Ativ. ${index + 1}`) : [],
      datasets: [
        {
          label: 'Tempo gasto (segundos)',
          data: subjectData.tempo || [],
          borderColor: subject.fontColor,
          backgroundColor: `${subject.fontColor}33`,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: subject.fontColor,
        },
      ],
    };
  };

  const stylesPaper = {
    padding: 2,
    height: '120px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '5px'
  }

  const stylesPaperChart = {
    height: '280px',
    padding: 2,
    borderRadius: '10px',
    margin: '5px'
  }

  // Corrigido: todo o JSX agora está dentro da função do componente.
  return (
    <Box sx={styles.box}>
      {subjectsData.map((subject) => {
        const subjectPerformance = performanceData?.find((item) => item.tipo === subject.name);

        return (
          <Accordion key={subject.name} sx={styles.accordion(subject.color)}>
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: subject.fontColor }} />}
              aria-controls={`panel-${subject.name}-content`}
              id={`panel-${subject.name}-header`}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: subject.fontColor }}>
                  <MenuBookOutlined />
                </Avatar>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: subject.fontColor, fontFamily: 'Irish Grover' }}>
                  {subject.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {/* Quadros menores */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Paper sx={stylesPaper}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Atividades Finalizadas
                    </Typography>
                    <Typography variant="h5" sx={{ color: subject.fontColor }}>
                      {subjectPerformance?.notas?.length || '0'}
                    </Typography>
                  </Paper>
                  <Paper sx={stylesPaper}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Persistência e Resiliência
                    </Typography>
                    <Typography variant="h5" sx={{ color: subject.fontColor }}>
                      {subjectPerformance?.persistenciaEResiliencia || '0'}
                    </Typography>
                  </Paper>
                </div>

                {/* Gráficos maiores */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Paper sx={stylesPaperChart} >
                    <Line
                      data={generateSparklineData(subject)}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                  <Paper sx={stylesPaperChart} >
                    <Line
                      data={generateTimeData(subject)}
                      options={{ maintainAspectRatio: false }}
                    />
                  </Paper>
                </div>
              </div>
            </AccordionDetails>

          </Accordion>
        );
      })}
    </Box>
  );
};
