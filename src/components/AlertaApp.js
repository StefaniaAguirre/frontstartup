import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function exitoApp(mensaje) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">mensaje</Alert>
    </Stack>
  );
}

export default function fracasoApp( mensaje) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">mensaje</Alert>
      </Stack>
    );
  }