import { IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InfoTooltip = ({ text }) => {
  return (
    <Tooltip title={text} arrow placement="top">
      <IconButton size="small" sx={{ 
        position: 'absolute', 
        right: '10px', 
        top: '10px',
        color: 'rgba(0, 0, 0, 0.54)'
      }}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default InfoTooltip; 