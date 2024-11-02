import React from 'react';
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
  Tooltip,
  IconButton
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Line } from 'react-chartjs-2';

const subjectsData = [
  { id: 1, name: 'Português', color: '#ffebee', fontColor: '#FF8158' },
  { id: 2, name: 'Matemática', color: '#e8f5e9', fontColor: '#86D718' },
  { id: 3, name: 'Raciocínio Lógico', color: '#fff8e1', fontColor: '#FFC329' },
];

const sparklineDataMap = {
  'Português': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Notas atividades anteriores',
        data: [8, 7, 9, 6, 8],
        borderColor: '#FF8158',
        backgroundColor: 'rgba(255, 129, 88, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#FF8158',
      }
    ]
  },
  'Matemática': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Notas atividades anteriores',
        data: [9, 6, 8, 7, 9],
        borderColor: '#86D718',
        backgroundColor: 'rgba(134, 215, 24, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#86D718',
      }
    ]
  },
  'Raciocínio Lógico': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Notas atividades anteriores',
        data: [7, 8, 6, 7, 8],
        borderColor: '#FFC329',
        backgroundColor: 'rgba(255, 195, 41, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#FFC329',
      }
    ]
  }
};

const averageTimeDataMap = {
  'Português': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Tempo médio (minutos)',
        data: [5, 6, 4, 8, 7],
        borderColor: '#FF8158',
        backgroundColor: 'rgba(255, 129, 88, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#FF8158',
      }
    ]
  },
  'Matemática': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Tempo médio (minutos)',
        data: [7, 5, 6, 7, 6],
        borderColor: '#86D718',
        backgroundColor: 'rgba(134, 215, 24, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#86D718',
      }
    ]
  },
  'Raciocínio Lógico': {
    labels: ['Ativ. 1', 'Ativ. 2', 'Ativ. 3', 'Ativ. 4', 'Ativ. 5'],
    datasets: [
      {
        label: 'Tempo médio (minutos)',
        data: [6, 7, 5, 6, 7],
        borderColor: '#FFC329',
        backgroundColor: 'rgba(255, 195, 41, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#FFC329',
      }
    ]
  }
};

const StudentPerformance = ({ student }) => {
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
      <Typography variant="h6" style={{ color: student.statusColor, fontWeight: 'bold', fontFamily: 'Irish Grover', fontSize: '20px' }}>
        Desempenho de {student.name}
      </Typography>

      <div>
        {subjectsData.map((subject) => (
          <Accordion
            key={subject.id}
            sx={{
              backgroundColor: subject.color,
              borderRadius: '10px',
              mb: 1,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: subject.fontColor }} />}
              aria-controls={`panel-${subject.id}-content`}
              id={`panel-${subject.id}-header`}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: subject.fontColor }}>
                  <MenuBookOutlinedIcon />
                </Avatar>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: subject.fontColor, fontFamily: 'Irish Grover' }}>
                  {subject.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper sx={{ padding: 1, height: '120px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', fontFamily: 'Irish Grover' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <Typography variant="body2" style={{ fontWeight: 'bold', color: '#424242' }}>Atividades Finalizadas</Typography>
                      <Tooltip title="Quantidade de atividades concluídas pelo aluno.">
                        <IconButton size="small">
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Typography variant="h5" style={{ color: subject.fontColor }}>20/25</Typography>
                  </Paper>
                  <Paper sx={{ padding: 1, height: '120px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', mt: 2, textAlign: 'center', fontFamily: 'Irish Grover' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <Typography variant="body2" style={{ fontWeight: 'bold', color: '#424242' }}>Persistência e Resiliência</Typography>
                      <Tooltip title="Indicador de esforço e resiliência ao completar atividades.">
                        <IconButton size="small">
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Typography variant="h5" style={{ color: subject.fontColor }}>5</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ height: '280px', padding: 2, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Line data={sparklineDataMap[subject.name]} options={{ maintainAspectRatio: false, scales: { y: { display: false }, x: { display: false } } }} />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ height: '280px', padding: 2, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Line data={averageTimeDataMap[subject.name]} options={{ maintainAspectRatio: false, scales: { y: { display: false }, x: { display: false } } }} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
};

export default StudentPerformance;
