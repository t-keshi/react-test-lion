import * as yupDefault from 'yup';
import { LocaleObject } from 'yup/lib/locale';

export const yupLocaleJP: LocaleObject = {
  mixed: {
    default: '正しい値を入力してください',
    required: '入力してください',
    defined: '入力してください',
  },
  string: {
    length: ({ length }) => `${length}文字で入力してください`,
    min: ({ min }) => `${min}文字以上で入力してください`,
    max: ({ max }) => `${max}文字以下で入力してください`,
    matches: `正しい形式で入力してください`,
    email: '正しいメールアドレスを入力してください',
    url: '正しいURLを入力してください',
    uuid: '正しいUUIDを入力してください',
    trim: '前後の空白を取り除いてください',
    lowercase: '小文字のみ入力してください',
    uppercase: '大文字のみ入力してください',
  },
  number: {
    min: ({ min }) => `${min}以上で入力してください`,
    max: ({ max }) => `${max}以下で入力してください`,
    lessThan: ({ less }) => `${less}未満で入力してください`,
    moreThan: ({ more }) => `${more}より大きい数を入力してください`,
    positive: '正の数を入力してください',
    negative: '負の数を入力してください',
    integer: '整数を入力してください',
  },
};

yupDefault.setLocale(yupLocaleJP);

export const yup = yupDefault;
export type SchemaOf<T> = yupDefault.SchemaOf<T>;
