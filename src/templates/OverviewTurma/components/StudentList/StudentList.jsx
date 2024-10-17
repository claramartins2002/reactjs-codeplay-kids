import React, { useState } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { HiOutlineChartBar } from "react-icons/hi";
import { PiPencilSimpleBold } from "react-icons/pi";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdUploadFile } from "react-icons/md";
import { Add, MoreVert } from '@mui/icons-material';
import avatar from './images/avatar_aluno.png';
import StudentPerformance from '../StudentsPerformance/StudentsPerformance';

const StudentList = ({studentsData}) => {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(null);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = (studentId) => {
    setOpenModal(studentId); // Armazena o ID do aluno no estado
  };

  const handleCloseModal = () => {
    setOpenModal(null); // Fecha o modal
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  const filteredStudents = Array.isArray(students) ? students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

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
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar aluno"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{ backgroundColor: '#FFF' }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Add />} sx={stylesButton}>
            Adicionar
          </Button>

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<MdUploadFile />}
            sx={stylesButton}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </Stack>
      </Stack>

      <List>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <React.Fragment key={student.id}>
              <ListItem sx={{ bgcolor: '#fff', mb: 1, borderRadius: '20px' }}>
                <ListItemAvatar>
                  <Avatar alt={student.name} src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={student.name}
                  secondary={student.status}
                  primaryTypographyProps={{
                    style: { color: student.statusColor, fontFamily: 'Irish Grover', fontSize: '21px' },
                  }}
                  secondaryTypographyProps={{
                    style: { color: student.statusColor, fontFamily: 'Coming Soon' },
                  }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Desempenho">
                    <IconButton
                      edge="end"
                      aria-label="bar-chart"
                      sx={{ color: student.statusColor }}
                      onClick={() => handleOpenModal(student.id)}
                    >
                      <HiOutlineChartBar />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar">
                    <IconButton edge="end" aria-label="edit" sx={{ color: student.statusColor }}>
                      <PiPencilSimpleBold />
                    </IconButton>
                  </Tooltip>

                  <IconButton edge="end" aria-label="more" sx={{ color: student.statusColor }}>
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              {/* Dialog específico para cada aluno */}
              <Dialog
                open={openModal === student.id}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  sx: {
                    border: `1rem solid ${student.statusColor}`,
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: '#fffdf9',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <DialogTitle sx={{ fontFamily: 'Irish Grover', fontSize: '22px', fontWeight: 'bold' }}>
                  Desempenho nas matérias
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseModal}
                    aria-label="close"
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      right: '15px',
                    }}
                  >
                    <RiCloseLargeFill />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <StudentPerformance student={student} />
                </DialogContent>
              </Dialog>
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText 
              primaryTypographyProps={{
                style: { fontFamily: 'Coming Soon' },
              }}
              primary="Nenhum aluno encontrado." 
            />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default StudentList;
