/* eslint-disable @typescript-eslint/ban-types */
// T[]型からT型を取得する
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// A型のうちでB型の制約を満たさないA型のみを返す
export type SetDifference<A, B> = A extends B ? never : A;

// T型(object)のうちでU型(object)のキーにない型のみを返す
export type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;

// T型(object)のうちでU型(object)のキーと共通する型のみを返す
export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

// U型(object)のうちでT型のキーと共通の型と残りのT型のキーを併せたものを返す
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>,
> = Pick<I, keyof I>;

export interface Timestamps {
  updatedAt: Date;
  createdAt: Date;
}

// updatedAtとcreatedAtをDate型に変換する
export type ConvertDate<T extends object> = Overwrite<T, Timestamps>;

// T型(object)を全てoptionalなundefined型に変換する
export type Empty<T extends object> = {
  [P in keyof T]?: undefined;
};

// U型(object)のキーのうちでT型(object)のキーにないものを全てoptionalなundefined型に変換する
export type DiffEmpty<T extends object, U extends object> = Empty<
  Pick<U, Exclude<keyof U, keyof T>>
>;
