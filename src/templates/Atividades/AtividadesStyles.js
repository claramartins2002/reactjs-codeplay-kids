export const stylesButton = {
  backgroundColor: '#7fe287',
  color: '#fff',
  fontSize: '21px',
  margin: '20px',
  fontFamily: 'Irish Grover',
  padding: '10px 20px',
  borderRadius: '30px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#7fe287',
  },
};

export const tabsStyle = {
  '& .MuiTab-root': {
    fontFamily: 'Coming Soon',
    fontSize: '1.1rem',
    color: '#000',
    '&.Mui-selected': {
      color: '#7AD487',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#7AD487',
  },
}

export const styleMenuItem = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.5rem', 
  fontFamily: 'Coming Soon' 
}

export const ListStyles = {
  list: {
    width: '100%',
    bgcolor: 'transparent',
    padding: '10px',
    maxHeight: '400px',
    overflow: 'auto',
    '& .MuiListItem-root': {
      marginBottom: '8px',
    },
    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c8b7f9',
      borderRadius: '4px',
      '&:hover': {
        background: '#b39ddb'
      }
    }
  },
  typography: {
    fontFamily: 'Coming Soon',
    marginBottom: 2,
    color: '#6c5ce7'
  },
  primaryTypography: {
    fontFamily: 'Irish Grover',
    fontSize: '21px',
    color: '#6c5ce7'
  },
  listItem: { 
    bgcolor: '#fff',
    mb: 1,
    borderRadius: '20px',
    border: '1px solid #c8b7f9'
  },
  typographyListitem: { 
    fontFamily: 'Coming Soon', 
    color: '#666'
  }
};