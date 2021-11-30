export const END_POINT =
  process.env.REACT_APP_USE_MOCK_SERVER === 'true'
    ? process.env.REACT_APP_MOCK_API_END_POINT ?? ''
    : process.env.REACT_APP_API_END_POINT ?? '';
