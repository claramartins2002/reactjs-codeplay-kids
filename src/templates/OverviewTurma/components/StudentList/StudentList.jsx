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
  Stack
} from '@mui/material';
import { HiOutlineChartBar } from "react-icons/hi";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdUploadFile } from "react-icons/md";
import { Add, MoreVert } from '@mui/icons-material';

const studentsData = [
  { id: 1, name: 'Maria Leticia da Silva', status: 'Online há 10 minutos', statusColor: 'orange' },
  { id: 2, name: 'João Pedro Amorim', status: 'Online há 1 dia', statusColor: 'blue' },
  { id: 3, name: 'Gabriel dos Santos', status: 'Online agora', statusColor: 'green' },
  { id: 4, name: 'Joana Cesquim Moraes', status: 'Online há 2 horas', statusColor: 'purple' },
];

const StudentList = () => {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');

  const stylesButton = {
    backgroundColor: '#EB9EE8',
    color: '#fff',
    fontSize: '19px',
    fontFamily: 'Irish Grover',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#EB9EE8',
    },
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          sx={{
            backgroundColor: '#FFF'
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={stylesButton}
          >
            Adicionar
          </Button>

          <Button 
            variant="contained" 
            startIcon={<MdUploadFile />}
            sx={stylesButton}
          >
          </Button>
        </Stack>
      </Stack>

      <List>
        {filteredStudents.map((student) => (
          <ListItem key={student.id} sx={{ bgcolor: '#fff', mb: 1, borderRadius: '10px'}}>
            <ListItemAvatar>
              <Avatar alt={student.name} src="/path/to/avatar.png" />
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
              <IconButton edge="end" aria-label="bar-chart" sx={{ color: student.statusColor }}>
                <HiOutlineChartBar />
              </IconButton>
              <IconButton edge="end" aria-label="edit" sx={{ color: student.statusColor }}>
                <PiPencilSimpleBold />
              </IconButton>
              <IconButton edge="end" aria-label="more" sx={{ color: student.statusColor }}>
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudentList;
