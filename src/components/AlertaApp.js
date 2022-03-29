import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertaRegistroApp() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Verifique los datos ingresados no corresponde con los campos, o se encuentran vacios</Alert>
      <Alert severity="success">Usuario Registrado con Éxito!</Alert>
    </Stack>
  );
}

export default function AlertaInicioApp() {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Verifique los datos ingresados no corresponde a un Usuario registrado</Alert>
        <Alert severity="success">Ingreso con Éxito!</Alert>
      </Stack>
    );
  }