/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, MouseEventHandler } from 'react';
import { ButtonProps } from '@mui/material';
import { callAllHandlers } from '../misc/callAllHandlers';
import { useCallbackRef } from './useCallbackRef';

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  isMutating?: boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  handleSubmit: (onClick: MouseEventHandler<HTMLButtonElement>) => void;
}

export const useDisclosure = ({
  defaultIsOpen = false,
  onClose,
  onOpen,
}: UseDisclosureProps = {}): UseDisclosureReturn => {
  const onOpenPropCallbackRef = useCallbackRef(onOpen);
  const onClosePropCallbackRef = useCallbackRef(onClose);
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [shouldClose, setShouldClose] = useState(false);

  const handleOpen = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef?.();
  }, [isOpen, onOpenPropCallbackRef]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    onClosePropCallbackRef?.();
  }, [isOpen, onClosePropCallbackRef]);

  const handleToggle = useCallback(() => {
    const action = isOpen ? handleClose : handleOpen;
    action();
  }, [isOpen, handleClose, handleOpen]);

  const handleClickSubmit = useCallback(() => {
    if (!shouldClose) {
      setShouldClose(true);
    }
  }, [shouldClose]);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
    handleSubmit: (onClick: ButtonProps['onClick']) => callAllHandlers(onClick, handleClickSubmit),
  };
};
