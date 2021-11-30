import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { QueryCache } from 'react-query';
import { server } from './tests/handlers/server';

const queryCache = new QueryCache();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
  // cleanup();
});
afterAll(() => server.close());
