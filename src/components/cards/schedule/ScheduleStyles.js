import { createTheme } from '@mui/material/styles';

export const styleChip = {
  fontFamily: 'Coming Soon',
  fontSize: '15px',
  color: '#fff'
}

export const weekDaysBox = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '15px',
  marginTop: '20px',

  maxHeight: '300px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px',
    backgroundColor: '#F5F5F5',
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ff7d00',
    borderRadius: '10px',
  },
}

export const ButtonGroupStyle = {
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  padding: '10px',
  scrollbarWidth: 'thin',
  justifyContent: 'center',
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
  },
}

export const theme = createTheme({
    palette: {
      ochre: {
        main: '#FFF',
        light: '#ffd5b1',
        dark: '#fe9c51',
        contrastText: '#ffd5b1',
      },
    },
  });