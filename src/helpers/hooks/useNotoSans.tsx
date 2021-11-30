import { useEffect } from 'react';
import WebFont from 'webfontloader';

export const useNotoSans = (): void =>
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Noto+Sans+JP:wght@400;500;700'],
      },
    });
  }, []);
