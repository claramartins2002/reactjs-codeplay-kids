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
import { Line } from 'react-chartjs-2';
import ApiService from '../../../utils/ApiService';

const subjectsData = [
  { name: 'Português', color: '#ffebee', fontColor: '#FF8158' },
  { name: 'Matemática', color: '#e8f5e9', fontColor: '#86D718' },
  { name: 'Raciocínio Lógico', color: '#fff8e1', fontColor: '#FFC329' },
];

const StudentPerformance = ({ student }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await apiService.get(`desempenho/aluno/${student.id}`);
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

  // Corrigido: todo o JSX agora está dentro da função do componente.
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#f9fbff',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      {subjectsData.map((subject) => {
        const subjectPerformance = performanceData?.find((item) => item.tipo === subject.name);

        return (
          <Accordion
            key={subject.name}
            sx={{
              backgroundColor: subject.color,
              borderRadius: '10px',
              mb: 1,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: subject.fontColor }} />}
              aria-controls={`panel-${subject.name}-content`}
              id={`panel-${subject.name}-header`}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: subject.fontColor }}>
                  <MenuBookOutlined />
                </Avatar>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: subject.fontColor }}>
                  {subject.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper sx={{ padding: 1, height: '120px', borderRadius: '10px', textAlign: 'center' }}>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>Atividades Finalizadas</Typography>
                    <Typography variant="h5" style={{ color: subject.fontColor }}>
                      {subjectPerformance?.notas?.length || '0'}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ height: '280px', padding: 2, borderRadius: '10px' }}>
                        <Line data={generateSparklineData(subject)} options={{ maintainAspectRatio: false }} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ height: '280px', padding: 2, borderRadius: '10px' }}>
                        <Line data={generateTimeData(subject)} options={{ maintainAspectRatio: false }} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default StudentPerformance;
