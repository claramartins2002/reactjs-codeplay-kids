// ListaAlunosHeader.jsx
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

const ListaAlunosHeader = ({ searchTerm, onSearchChange, onAddClick, onUploadChange }) => {
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
        <Button variant="contained" startIcon={<Add />} sx={stylesButton} onClick={onAddClick}>
          Adicionar
        </Button>

        <Button
          component="label"
          variant="contained"
          startIcon={<MdUploadFile />}
          sx={stylesButton}
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

export default ListaAlunosHeader;
