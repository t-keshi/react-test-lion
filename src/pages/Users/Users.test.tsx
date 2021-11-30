import { rest } from 'msw';
import { byTestId, byText } from 'testing-library-selector';
import { server } from '../../tests/handlers/server';
import { testUser } from '../../tests/data/testUser';
import { render, waitFor } from '../../test-utils';
import { Users } from './Users';
import { END_POINT } from '../../constants/endpoint';
import { noop } from '../../helpers/misc/noop';
import { kyAuth } from '../../containers/api/kyInstance';

const ui = {
  skelton: byTestId(/skeleton/),
  pageTitle: byText(/ユーザー一覧/),
  testUserName: byText(new RegExp(testUser.name)),
  testUserEmail: byText(new RegExp(testUser.email)),
  testUserProfile: byText(new RegExp(testUser.name)),
  userName: byTestId(/user-name/),
  userEmail: byTestId(/user-email/),
  userProfile: byTestId(/user-profile/),
  errorMessage: byText(/エラーが発生しました/),
};

test('ユーザーは他のユーザーの情報を見ることができる', async () => {
  const spyFetch = jest.spyOn(kyAuth, 'get');
  document.cookie = `userId=${testUser.id}`;

  render(<Users />);

  // ユーザー一覧ページの表示を待機する
  expect(spyFetch).toHaveBeenCalledTimes(1);
  expect(ui.skelton.get()).toBeInTheDocument();
  await waitFor(() => expect(ui.skelton.query()).not.toBeInTheDocument());

  // ユーザー一覧ページが表示される
  expect(ui.pageTitle.get()).toBeInTheDocument();

  // ユーザー一覧に自分のプロフィール情報が表示される
  expect(ui.testUserName.get()).toBeInTheDocument();
  expect(ui.testUserEmail.get()).toBeInTheDocument();
  expect(ui.testUserProfile.get()).toBeInTheDocument();

  // ユーザー一覧に他のユーザーのプロフィール情報が表示される
  expect(ui.userName.getAll().length).toBeGreaterThan(1);
  expect(ui.userEmail.getAll().length).toBeGreaterThan(1);
  expect(ui.userProfile.getAll().length).toBeGreaterThan(1);
});

test('エラーが起きたらエラー画面を表示する', async () => {
  render(<Users />);
  server.use(rest.get(`${END_POINT}/users`, (_, res, ctx) => res(ctx.status(500))));

  // 意図的に引き起こすエラーの出力を無視する
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(noop);
  await waitFor(() => expect(ui.skelton.query()).not.toBeInTheDocument());
  spy.mockRestore();
});
