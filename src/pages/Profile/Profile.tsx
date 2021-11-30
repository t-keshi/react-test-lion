import { Button, Typography, DialogActions, Skeleton, Dialog, DialogContent } from '@mui/material';
import { SimpleGrid } from '../../components/ui/SimpleGrid/SimpleGrid';
import { Flex } from '../../components/ui/Flex/Flex';
import { FormTextField } from '../../components/ui/Form/FormTextField';
import { useDisclosure } from '../../helpers/hooks/useDisclosure';
import { Form } from '../../components/ui/Form/Form';
import { useUpdateProfile } from '../../containers/api/useUpdateProfile';
import { useProfileForm, ProfileFormValues } from '../../helpers/validator/useProfileForm';
import { useFetchProfile } from '../../containers/api/useFetchProfile';

export const Profile: React.VFC = () => {
  // ---------- dialog ----------
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  // ---------- form ----------
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useProfileForm();

  // ---------- query ----------
  const { data, isLoading } = useFetchProfile({
    onSuccess: (res) => {
      reset({
        name: res.name,
        profile: res.profile,
      });
    },
  });

  // ---------- mutation ----------
  const { mutate } = useUpdateProfile();

  // ---------- submit ----------
  const onSubmit = handleSubmit(({ name, profile }) =>
    mutate({ name, profile }, { onSuccess: () => handleClose() }),
  );

  if (isLoading) {
    return <Skeleton variant="text" width={120} data-testid="skeleton" />;
  }

  if (!data) {
    throw new Error('データの取得に失敗しました');
  }

  return (
    <>
      <Flex sx={{ justifyContent: 'space-between', mb: 4 }} data-testid="profile-loaded">
        <Typography variant="h4">プロフィール</Typography>
        <Button variant="contained" onClick={handleOpen}>
          編集
        </Button>
      </Flex>
      <SimpleGrid
        sx={{ gridTemplateColumns: 'auto 1fr', columnGap: 24, gridGap: 16, alignItems: 'center' }}
      >
        <Typography variant="body1">名前</Typography>
        <Typography variant="body2">{data.name}</Typography>
        <Typography variant="body1">自己紹介</Typography>
        <Typography variant="body2">{data.profile}</Typography>
      </SimpleGrid>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <Form<ProfileFormValues> control={control}>
            <FormTextField<ProfileFormValues>
              name="name"
              margin="normal"
              fullWidth
              required
              label="名前"
            />
            <FormTextField<ProfileFormValues>
              name="profile"
              margin="normal"
              fullWidth
              required
              label="自己紹介"
            />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button variant="contained" onClick={onSubmit} disabled={!isDirty}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
