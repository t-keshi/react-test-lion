import { Snackbar } from '@mui/material';
import { useSnackbar } from '../containers/contexts/snackbar';
import { useNotoSans } from '../helpers/hooks/useNotoSans';

const AUTO_HIDE_DURATION = 5000;

export const AppUtilities: React.VFC = () => {
  const [snackbarState, snackbarDispatch] = useSnackbar();
  useNotoSans();

  return (
    <Snackbar
      open={snackbarState.isOpen}
      message={snackbarState.message}
      onClose={() => snackbarDispatch({ type: 'close' })}
      autoHideDuration={AUTO_HIDE_DURATION}
    />
  );
};
