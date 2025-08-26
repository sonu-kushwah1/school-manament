import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

interface SimpleAlertProps {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  showIcon?: boolean;
}

const SimpleAlert: React.FC<SimpleAlertProps> = ({ message, severity, showIcon = true }) => {
  return (
    <Alert 
      icon={showIcon ? <CheckIcon fontSize="inherit" /> : false} 
      severity={severity}
    >
      {message}
    </Alert>
  );
};

export default SimpleAlert;
