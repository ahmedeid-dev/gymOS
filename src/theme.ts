import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: { primary: { main: '#0f766e' }, secondary: { main: '#f59e0b' }, background: { default: '#f5f7fb' } },
  typography: { fontFamily: '"Inter", "Cairo", sans-serif', h4: { fontWeight: 800 }, h5: { fontWeight: 800 } },
  shape: { borderRadius: 14 },
  components: { MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { textTransform: 'none', fontWeight: 700 } } }, MuiCard: { styleOverrides: { root: { boxShadow: '0 8px 30px rgba(15, 23, 42, .06)', border: '1px solid #e8edf3' } } } },
});
