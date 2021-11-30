import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const allCoolies = document.cookie;
  const userId =
    allCoolies
      .split('; ')
      .find((row) => row.startsWith('userId='))
      ?.split('=')[1] ?? undefined;
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
