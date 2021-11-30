import { Avatar, Button, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormTextField } from '../../components/ui/Form/FormTextField';
import { Center } from '../../components/ui/Center/Center';
import { Form } from '../../components/ui/Form/Form';
import { useLoginForm, LoginFormValues } from '../../helpers/validator/useLoginForm';
import { useLogin } from '../../containers/api/useLogin';

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.VFC = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useLoginForm();
  const submitAble = Object.keys(dirtyFields).length === 2;
  const onSubmit = handleSubmit(() =>
    mutate(undefined, {
      onSuccess: () => {
        navigate('/profile');
      },
    }),
  );

  return (
    <Container component="main" maxWidth="xs">
      <Center sx={{ mt: 8 }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
      </Center>
      <Form<FormValues> sx={{ mt: 1 }} control={control} onSubmit={onSubmit}>
        <FormTextField<LoginFormValues>
          name="email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          label="Eメールアドレス"
          autoComplete="email"
        />
        <FormTextField<LoginFormValues>
          name="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          label="パスワード"
          type="password"
          autoComplete="current-password"
        />
        <Button
          sx={{ mt: 3 }}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          disabled={!submitAble}
        >
          ログイン
        </Button>
      </Form>
    </Container>
  );
};
