export const styles = {
  box: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f9fbff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },

  accordion: (color) => ({
    backgroundColor: color,
    borderRadius: '10px',
    mb: 1,
    '&:before': { display: 'none' },
  })
}