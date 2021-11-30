import userEvent from '@testing-library/user-event';
import { byTestId, byText, byRole, byLabelText } from 'testing-library-selector';
import { rest } from 'msw';
import { server } from '../../tests/handlers/server';
import { render, waitFor } from '../../test-utils';
import { Profile } from './Profile';
import { noop } from '../../helpers/misc/noop';
import { testUser } from '../../tests/data/testUser';
import { END_POINT } from '../../constants/endpoint';
import { kyAuth } from '../../containers/api/kyInstance';

const newTestUser = {
  id: testUser.id,
  name: '橋本太郎',
  profile: '橋本歯科で働いています。',
};

const newTestUserWrongPattern = {
  profile:
    '橋本歯科で働いています。Anim esse sit nulla ut fugiat deserunt nulla fugiat.Esse consequat eu aliquip irure non dolor culpa proident eu. Commodo pariatur sunt enim enim ipsum veniam est laborum eiusmod Lorem in excepteur. Nostrud velit dolore nulla irure eu labore nulla occaecat sint eu aliquip eu aliqua. Aute minim nisi anim occaecat aliqua nulla. Reprehenderit veniam ut cillum ad deserunt cupidatat commodo anim enim eu. Laborum ex irure Lorem labore laborum adipisicing dolor eiusmod incididunt culpa deserunt ea. Consequat enim enim dolor id elit irure incididunt sunt quis exercitation nisi deserunt exercitation ea.',
};

const ui = {
  skelton: byTestId(/skeleton/i),
  pageTitle: byText(/プロフィール/i),
  editDialog: byRole('dialog'),
  editButton: byRole('button', { name: /編集/ }),
  saveButton: byRole('button', { name: /保存/ }),
  cancelButton: byRole('button', { name: /キャンセル/ }),
  currentUserName: byText(new RegExp(testUser.name)),
  currentUserProfile: byText(new RegExp(testUser.profile)),
  newUserName: byText(new RegExp(newTestUser.name)),
  newUserProfile: byText(new RegExp(newTestUser.profile)),
  nameInputField: byLabelText(/名前/),
  profileInputField: byLabelText(/自己紹介/),
  profileErrorMaxChar: byText(/[0-9]文字以下で入力してください/),
  successMessage: byText(/変更しました/),
  errorMessage: byText(/エラーが発生しました/),
};

test('ユーザーはプロフィールを更新することができる', async () => {
  const spyFetch = jest.spyOn(kyAuth, 'get');
  const spyUpdate = jest.spyOn(kyAuth, 'post');
  document.cookie = `userId=${testUser.id}`;

  render(<Profile />);

  // プロフィールページの表示を待機する
  expect(spyFetch).toHaveBeenCalledTimes(1);
  expect(ui.skelton.get()).toBeInTheDocument();
  await waitFor(() => expect(ui.skelton.query()).not.toBeInTheDocument());

  // プロフィールページが表示される
  expect(ui.pageTitle.get()).toBeInTheDocument();

  // 現在の名前と自己紹介が表示される
  expect(ui.currentUserName.get()).toBeInTheDocument();
  expect(ui.currentUserProfile.get()).toBeInTheDocument();

  // ダイアログが閉じている
  expect(ui.editDialog.query()).not.toBeInTheDocument();

  // 編集ボタンを押す編集ダイアログが開く
  userEvent.click(ui.editButton.get());
  await waitFor(() => expect(ui.editDialog.get()).toBeInTheDocument());

  // 保存ボタンは押せない状態になっている
  expect(ui.saveButton.get()).toBeDisabled();

  // フォームには予め現在のプロフィール情報が入力されている
  expect(ui.nameInputField.get()).toHaveValue(testUser.name);
  expect(ui.profileInputField.get()).toHaveValue(testUser.profile);

  // キャンセルボタンを押すとダイアログが閉じる
  userEvent.click(ui.cancelButton.get());
  await waitFor(() => expect(ui.editDialog.query()).not.toBeInTheDocument());

  // フォームに新しいプロフィール情報を入力すると保存ボタンは押せる状態になる
  userEvent.click(ui.editButton.get());
  userEvent.clear(ui.nameInputField.get());
  userEvent.type(ui.nameInputField.get(), newTestUser.name);
  await waitFor(() => expect(ui.saveButton.get()).toBeEnabled());

  // 入力が適切でないとエラーが表示され、プロフィール情報が更新されない
  userEvent.type(ui.profileInputField.get(), newTestUserWrongPattern.profile);
  userEvent.click(ui.saveButton.get());
  await waitFor(() => expect(spyUpdate).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(ui.profileErrorMaxChar.get()).toBeInTheDocument());
  expect(ui.profileInputField.get()).toBeInvalid();

  // 入力が適切だとエラーが表示されず、プロフィール情報が更新される
  userEvent.clear(ui.profileInputField.get());
  userEvent.type(ui.profileInputField.get(), newTestUser.profile);
  await waitFor(() => expect(ui.profileErrorMaxChar.query()).not.toBeInTheDocument());
  expect(ui.profileInputField.get()).toBeValid();
  userEvent.click(ui.saveButton.get());
  await waitFor(() => expect(spyUpdate).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(ui.successMessage.get()).toBeInTheDocument());

  // 更新後のプロフィール情報が表示される
  await waitFor(() => expect(spyFetch).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(ui.newUserName.get()).toBeInTheDocument());
  expect(ui.newUserName.get()).toBeInTheDocument();
  expect(ui.newUserProfile.get()).toBeInTheDocument();
});

test('読み込みエラーが起きたらエラー画面を表示する', async () => {
  render(<Profile />);
  server.use(rest.get(`${END_POINT}/profile`, (_, res, ctx) => res(ctx.status(500))));

  // 意図的に引き起こすエラーの出力を無視する
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(noop);
  await waitFor(() => expect(ui.errorMessage.get()).toBeInTheDocument());
  spy.mockRestore();
});

test('更新エラーが起きたらエラー画面を表示する', async () => {
  render(<Profile />);
  server.use(rest.post(`${END_POINT}/profile`, (_, res, ctx) => res(ctx.status(500))));

  userEvent.click(ui.editButton.get());
  userEvent.type(ui.profileInputField.get(), newTestUser.profile);
  userEvent.type(ui.nameInputField.get(), newTestUser.name);
  userEvent.click(ui.saveButton.get());

  // 意図的に引き起こすエラーの出力を無視する
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(noop);
  await waitFor(() => expect(ui.errorMessage.get()).toBeInTheDocument());
  spy.mockRestore();
});
