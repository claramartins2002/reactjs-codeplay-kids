import React, { useState } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { BarChart, Edit, MoreVert } from '@mui/icons-material';

const StudentListItem = ({ student, color, onEdit, onPerformance, onDelete }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(student); // Passa o estudante para a função de deletar
  };

  return (
    <ListItem sx={{ bgcolor: '#fff', mb: 1, borderRadius: '20px' }}>
      <ListItemAvatar>
        <Avatar alt={student.nome} src={student.fotoUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={student.nome}
        secondary={student.status}
        primaryTypographyProps={{ style: { color, fontFamily: 'Irish Grover', fontSize: '21px' } }}
        secondaryTypographyProps={{ style: { color, fontFamily: 'Coming Soon' } }}
      />
      <ListItemSecondaryAction>
        <Tooltip title="Desempenho">
          <IconButton edge="end" sx={{ color }} onClick={() => onPerformance(student)}>
            <BarChart />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton edge="end" sx={{ color }} onClick={() => onEdit(student)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <IconButton edge="end" sx={{ color }} onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>Deletar</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default StudentListItem;
