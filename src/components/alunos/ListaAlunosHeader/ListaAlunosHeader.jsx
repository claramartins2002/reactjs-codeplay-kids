// ListaAlunosHeader.jsx
import { Stack, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MdUploadFile } from "react-icons/md";
import { stylesButton, VisuallyHiddenInput } from '../AlunosStyles.js'

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
