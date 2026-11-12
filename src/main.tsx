import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import App from '../App';
import { store } from './store';
import { i18n } from './i18n';
import { theme } from './theme';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
);
