import cases from 'jest-in-case';
import { profileSchema } from './useProfileForm';

interface Opts {
  name: string;
  input: {
    name: string;
    profile: string;
  };
  result: boolean;
}

const validInput = {
  name: '橋本太郎',
  profile: '橋本です。歯科医院で働いています。',
};

cases(
  'プロフィールのバリデーションスキーマのテスト',
  async (opts: Opts) => {
    expect(await profileSchema.isValid(opts.input)).toEqual(opts.result);
  },
  [
    {
      name: '正常',
      input: { name: validInput.name, profile: validInput.profile },
      result: true,
    },
    // 名前の間違い
    {
      name: '異常(名前が20文字を超える)',
      input: {
        name: '012345678901234567890',
        profile: validInput.profile,
      },
      result: false,
    },
    // プロフィールの間違い
    {
      name: '異常(プロフィールが200文字を超える)',
      input: {
        name: validInput.name,
        profile:
          '01234567890123456789012345678900123456789001234567890012345678901234567890123456789001234567890012345678900123456789012345678901234567890012345678900123456789001234567890123456789012345678900123456789001234567890',
      },
      result: false,
    },
    // TODO: ここにテストケースを追加
  ],
);
