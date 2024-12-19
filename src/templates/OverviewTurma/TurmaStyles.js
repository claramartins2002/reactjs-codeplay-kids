// TurmaStyles.js

export const menuStyles = {
  menu: {
    fontFamily: 'Coming Soon',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'Coming Soon',
  },
};

export const tabsStyles = (selectedTab) => ({
  '& .MuiTab-root': {
    fontFamily: 'Coming Soon',
    fontSize: '1.1rem',
    color: '#FFF',
    '&.Mui-selected': {
      color: selectedTab === 0 ? '#d144b4' : 
            selectedTab === 1 ? '#249d3e' : 
            selectedTab === 2 ? '#f57500' : '#FFF',
      transition: 'color 0.3s ease-in-out',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: selectedTab === 0 ? '#d144b4' : 
                selectedTab === 1 ? '#249d3e' : 
                selectedTab === 2 ? '#f57500' : '#FFF',
    transition: 'background-color 0.3s ease-in-out',
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
    background: selectedTab === 0 ? '#EB9EE8' : 
              selectedTab === 1 ? '#7AD487' : 
              selectedTab === 2 ? '#FFB347' : '#FFF',
    transition: 'background 0.3s ease-in-out',
    width: '25%',
    margin: 'auto',
    borderRadius: '10px 10px 0 0',
  },
});

export const dialogStyles = {
  dialogPaper: {
    padding: '20px',
    bgcolor: '#FBF7F5',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
};

export const BoxStyles = {
  box: {
    width: '100%',
    '& .MuiBox-root': {
      padding: '0'
    },
  }
};
