import { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppWrapper } from './app/AppWrapper';

const AllTheProviders: FC = ({ children }) => (
  <MemoryRouter>
    <AppWrapper>{children}</AppWrapper>
  </MemoryRouter>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
