import { Box, Typography, Skeleton, Card, CardContent, Stack } from '@mui/material';
import { useFetchUsers } from '../../containers/api/useFetchUsers';

export const Users: React.VFC = () => {
  const { data, isLoading } = useFetchUsers();

  if (isLoading) {
    return <Skeleton variant="text" width={120} data-testid="skeleton" />;
  }

  if (!data) {
    throw new Error('データの取得に失敗しました');
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">ユーザー一覧</Typography>
      </Box>
      <Stack spacing={2}>
        {data.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" data-testid="user-name">
                  {user.name}
                </Typography>
                <Typography color="textSecondary" variant="caption" data-testid="user-email">
                  {user.email}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" data-testid="user-profile">
                {user.profile}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};
