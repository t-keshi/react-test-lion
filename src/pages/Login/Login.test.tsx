import userEvent from '@testing-library/user-event';
import { byText, byRole, byLabelText } from 'testing-library-selector';
import { testUser } from '../../tests/data/testUser';
import { render, waitFor } from '../../test-utils';
import { Login } from './Login';
import { getUserIdFromCookie } from '../../helpers/misc/cookie';

const input = {
  email: testUser.email,
  password: 'xxxxXXXX',
};

const inputWrongPattern = {
  password: 'xxxx',
};

const ui = {
  editDialog: byRole('dialog'),
  loginButton: byRole('button', { name: /ログイン/ }),
  saveButton: byRole('button', { name: /保存/ }),
  emailInputField: byLabelText(/Eメールアドレス/),
  passwordInputField: byLabelText(/パスワード/),
  passwordErrorMinChar: byText(/[0-9]文字以上で入力してください/),
};

test('ユーザーはEメールとパスワードでログインすることができる', async () => {
  render(<Login />);

  // ユーザーは、ログインしていない
  expect(getUserIdFromCookie()).toBeUndefined();

  // ログインボタンは押せない状態になっている
  expect(ui.loginButton.get()).toBeDisabled();

  // フォームをすべて入力するとログインボタンは押せる状態になる
  userEvent.type(ui.emailInputField.get(), input.email);
  userEvent.type(ui.passwordInputField.get(), inputWrongPattern.password);
  await waitFor(() => expect(ui.loginButton.get()).toBeEnabled());

  // 入力が適切でないとエラーが表示され、ログインできない
  userEvent.click(ui.loginButton.get());
  await waitFor(() => expect(ui.passwordErrorMinChar.get()).toBeInTheDocument());
  expect(ui.passwordInputField.get()).toBeInvalid();
  expect(getUserIdFromCookie()).toBeUndefined();

  // 入力が適切だとエラーが表示されず、ログインできる
  userEvent.clear(ui.passwordInputField.get());
  userEvent.type(ui.passwordInputField.get(), input.password);
  await waitFor(() => expect(ui.passwordErrorMinChar.query()).not.toBeInTheDocument());
  expect(ui.passwordInputField.get()).toBeValid();
  userEvent.click(ui.loginButton.get());
  await waitFor(() => expect(getUserIdFromCookie()).toBeDefined());
});
