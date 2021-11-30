/* eslint-disable @typescript-eslint/no-explicit-any */
export type FunctionArguments<T extends (...args: any) => any> = T extends (...args: infer R) => any
  ? R
  : never;

type Func<T extends (event: any) => void> = (event: FunctionArguments<T>[0]) => any;

export const callAllHandlers = <T extends (event: any) => any>(
  ...fns: (T | undefined)[]
): Func<T> => {
  const func: Func<T> = (event: FunctionArguments<T>[0]) => {
    fns.some((fn) => {
      fn?.(event);

      return event?.defaultPrevented;
    });
  };

  return func;
};

export const callAllFn = <T extends (...args: any) => any>(fns: (T | undefined)[]): Func<T> => {
  const func: Func<T> = () => {
    fns.every((fn) => fn?.());
  };

  return func;
};
