import { produce } from 'immer';
import { createReducerContext } from '../../helpers/factory/createReducerContext';

interface State {
  isOpen: boolean;
  message: string;
}

interface Close {
  type: 'close';
}

interface Open {
  type: 'open';
  payload: {
    message: string;
  };
}

type Action = Close | Open;

const initialState: State = {
  isOpen: false,
  message: '',
};

export const reducer = produce((draft: State, action: Action): void => {
  switch (action.type) {
    case 'close':
      draft.isOpen = initialState.isOpen;
      draft.message = initialState.message;

      return;
    case 'open':
      draft.isOpen = true;
      draft.message = action.payload.message;

      return;
    default:
      throw new Error('actionの値が正しくありません');
  }
});

export const [useSnackbar, SnackbarProvider] = createReducerContext<typeof reducer>(
  reducer,
  initialState,
);
