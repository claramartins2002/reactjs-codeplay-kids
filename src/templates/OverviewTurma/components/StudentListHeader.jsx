// StudentListHeader.jsx
import { Stack, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MdUploadFile } from "react-icons/md";
import { styled } from '@mui/material/styles';

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

const StudentListHeader = ({ searchTerm, onSearchChange, onAddClick, onUploadChange, buttonStyles }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Buscar aluno"
        value={searchTerm}
        onChange={onSearchChange}
        size="small"
        sx={{ backgroundColor: '#FFF' }}
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<Add />} sx={buttonStyles} onClick={onAddClick}>
          Adicionar
        </Button>

        <Button
          component="label"
          variant="contained"
          startIcon={<MdUploadFile />}
          sx={buttonStyles}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            onChange={onUploadChange}
            multiple
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default StudentListHeader;
