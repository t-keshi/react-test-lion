import { Refresh } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { ErrorBoundary } from './ErrorBoundary';
import { Center } from '../Center/Center';

export const FallbackComponent: React.VFC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Center sx={{ height: '90vh', p: 2 }}>
      <Box sx={{ width: 450 }}>
        <Typography variant="h3" gutterBottom data-testid="error-message">
          エラーが発生しました
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          このページを更新してください。
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRefresh}>
          <Refresh />
        </Button>
      </Box>
    </Center>
  );
};

export const TopErrorBoundary: React.FC = ({ children }) => (
  <ErrorBoundary fallbackRender={() => <FallbackComponent />}>{children}</ErrorBoundary>
);
