import { styled } from '@mui/material/styles';

export const stylesButton = {
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

export const VisuallyHiddenInput = styled('input')({
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