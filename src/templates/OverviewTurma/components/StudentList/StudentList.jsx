// StudentList.jsx
import React, { useState, useMemo } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Typography
} from '@mui/material';
import { BarChart, Edit, Close, MoreVert } from '@mui/icons-material';
import StudentPerformance from '../StudentsPerformance/StudentsPerformance';
import StudentListHeader from '../StudentListHeader';
import ColorUtils from '../../../../utils/Colors';

const StudentList = ({ studentsData, onAddClick }) => {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(null);

  // Memorizar uma cor fixa para cada aluno usando useMemo
  const studentColors = useMemo(() => {
    return studentsData.reduce((colors, student) => {
      colors[student.id] = ColorUtils.getRandomColor(500);
      return colors;
    }, {});
  }, [studentsData]);

  const stylesButton = {
    backgroundColor: '#EB9EE8',
    color: '#fff',
    fontSize: '19px',
    margin: '0',
    fontFamily: 'Irish Grover',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#EB9EE8',
    },
  };

  console.log(students)

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleUploadChange = (event) => console.log(event.target.files);

  const handleOpenModal = (studentId) => setOpenModal(studentId);
  const handleCloseModal = () => setOpenModal(null);

  const filteredStudents = Array.isArray(students)
    ? students.filter(student => student.nome && student.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div style={{ 
        width: '50%',
        padding: '20px',
        backgroundColor: '#FBF7F5',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '50px',
        border: '#EB9EE8 solid 1rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <StudentListHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={onAddClick}
        onUploadChange={handleUploadChange}
        buttonStyles={stylesButton}
      />

      <List>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => {
            const color = studentColors[student.id];

            return (
              <React.Fragment key={student.id}>
                <ListItem sx={{ bgcolor: '#fff', mb: 1, borderRadius: '20px' }}>
                  <ListItemAvatar>
                    <Avatar alt={student.nome} src={student.fotoUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={student.nome}
                    secondary={student.status}
                    primaryTypographyProps={{
                      style: { color: color, fontFamily: 'Irish Grover', fontSize: '21px' },
                    }}
                    secondaryTypographyProps={{
                      style: { color: color, fontFamily: 'Coming Soon' },
                    }}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Desempenho">
                      <IconButton
                        edge="end"
                        aria-label="bar-chart"
                        sx={{ color: color }}
                        onClick={() => handleOpenModal(student.id)}
                      >
                        <BarChart />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar">
                      <IconButton edge="end" aria-label="edit" sx={{ color: color }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <IconButton edge="end" aria-label="more" sx={{ color: color }}>
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <Dialog
                  open={openModal === student.id}
                  onClose={handleCloseModal}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      border: `1rem solid ${color}`,
                      bgcolor: '#FBF7F5',
                      borderRadius: '20px',
                    },
                  }}
                >
                  <DialogTitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" style={{ color: color, fontWeight: 'bold', fontFamily: 'Irish Grover', fontSize: '20px' }}>
                      Desempenho de {student.nome}
                    </Typography>
                      <IconButton onClick={handleCloseModal}>
                        <Close />
                      </IconButton>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <StudentPerformance student={student} color={color} />
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            );
          })
        ) : (
          <ListItem sx={{ bgcolor: '#fff', mb: 1, borderRadius: '20px' }}>
            <ListItemText primary="Nenhum aluno encontrado." />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default StudentList;
