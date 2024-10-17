import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Stack,
  Box
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const subjectsData = [
  { id: 1, name: 'Português', color: '#ffebee', fontColor: '#FF8158', icon: '/path/to/portugues-icon.png' },
  { id: 2, name: 'Matemática', color: '#e8f5e9', fontColor: '#86D718',icon: '/path/to/matematica-icon.png' },
  { id: 3, name: 'Raciocínio Lógico', color: '#fff8e1', fontColor: '#FFC329', icon: '/path/to/raciocinio-icon.png' },
];

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
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${subject.id}-content`}
              id={`panel-${subject.id}-header`}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={subject.icon} alt={subject.name} />
                <Typography variant="h6" style={{ fontWeight: 'bold', color: subject.fontColor, fontFamily: 'Irish Grover'}}>
                  {subject.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" style={{ color: '#757575' }}>
                Desempenho detalhado da matéria {subject.name} vai aqui.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
};

export default StudentPerformance;
