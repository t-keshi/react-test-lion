import React from 'react';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

type FallbackRender = (
  props: FallbackProps,
) => React.ReactElement<unknown, string | React.FunctionComponent | typeof React.Component> | null;

interface ErrorBoundaryProps {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined,
  ) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  resetKeys?: Array<unknown>;
  fallbackRender: FallbackRender;
}

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

export class ErrorBoundary extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  // eslint-disable-next-line react/state-in-constructor
  state = initialState;

  updatedWithError = false;

  componentDidMount(): void {
    const { error } = this.state;

    if (error !== null) {
      this.updatedWithError = true;
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;
    const isResetKeysChanged =
      prevProps.resetKeys &&
      resetKeys &&
      (prevProps.resetKeys.length !== resetKeys.length ||
        prevProps.resetKeys.some((item, index) => !Object.is(item, resetKeys[index])));

    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;

      return;
    }

    if (error !== null && isResetKeysChanged) {
      onResetKeysChange?.(prevProps.resetKeys, resetKeys);
      this.reset();
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    const { onError } = this.props;
    onError?.(error, info);
  }

  resetErrorBoundary = (...args: Array<unknown>): void => {
    const { onReset } = this.props;

    onReset?.(...args);
    this.reset();
  };

  reset(): void {
    this.updatedWithError = false;
    this.setState(initialState);
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      return fallbackRender(props);
    }

    return children;
  }
}
