import cases from 'jest-in-case';
import { loginSchema } from './useLoginForm';

interface Opts {
  name: string;
  input: {
    email: string;
    password: string;
  };
  result: boolean;
}

const validInput = {
  email: 'yukihashimoto@gmail.com',
  password: 'xxxxXXXX',
};

cases(
  'ログインのバリデーションスキーマのテスト',
  async (opts: Opts) => {
    expect(await loginSchema.isValid(opts.input)).toEqual(opts.result);
  },
  [
    {
      name: '正常',
      input: { email: validInput.email, password: validInput.password },
      result: true,
    },
    // Eメールアドレスの間違い
    {
      name: '異常(@がない)',
      input: {
        email: 'yukihashimoto.com',
        password: validInput.password,
      },
      result: false,
    },
    // パスワードの間違い
    {
      name: '異常(パスワードが8文字未満)',
      input: { email: validInput.email, password: 'xxxxXXX' },
      result: false,
    },
    {
      name: '異常(大文字と小文字の混合でない-大文字のみ)',
      input: { email: validInput.email, password: 'XXXXXXXX' },
      result: false,
    },
    {
      name: '異常(大文字と小文字の混合でない-小文字のみ)',
      input: { email: validInput.email, password: 'xxxxxxxx' },
      result: false,
    },
  ],
);
