import { createTheme } from '@mui/material/styles';

export const styleChip = {
  fontFamily: 'Coming Soon',
  fontSize: '15px',
  color: '#fff'
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