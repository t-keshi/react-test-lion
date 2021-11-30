import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TopErrorBoundary } from '../components/ui/ErrorBoundary/TopErrorBoundary';
import { combineProviders } from '../helpers/factory/combineProviders';
import { SnackbarProvider } from '../containers/contexts/snackbar';
import { theme } from '../components/theme/theme';
import { AppUtilities } from './AppUtilities';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, useErrorBoundary: true },
    mutations: { retry: false, useErrorBoundary: true },
  },
});

export const AppWrapper: React.FC = ({ children }) => {
  const CombinedProviders = combineProviders([SnackbarProvider]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <CombinedProviders>
            <div>
              <AppUtilities />
              {children}
            </div>
          </CombinedProviders>
        </QueryClientProvider>
      </TopErrorBoundary>
    </ThemeProvider>
  );
};
