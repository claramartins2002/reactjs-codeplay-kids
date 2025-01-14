// StudentDialog.jsx
import { IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import {StudentPerformance} from '../StudentsPerformance/StudentsPerformance';

const StudentDialog = ({ open, student, color, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    PaperProps={{ sx: { border: `1rem solid ${color}`, bgcolor: '#FBF7F5', borderRadius: '20px', maxWidth: '50%' } }}
  >
    <DialogTitle>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" style={{ color, fontWeight: 'bold', fontFamily: 'Irish Grover', fontSize: '20px' }}>
          Desempenho de {student.nome}
        </Typography>
        <IconButton onClick={onClose}><Close /></IconButton>
      </div>
    </DialogTitle>
    <DialogContent>
      <StudentPerformance student={student} color={color} />
    </DialogContent>
  </Dialog>
);

export default StudentDialog;