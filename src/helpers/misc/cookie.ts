export const getUserIdFromCookie = (): string | undefined => {
  const allCoolies = document.cookie;
  const userId =
    allCoolies
      .split('; ')
      .find((row) => row.startsWith('userId='))
      ?.split('=')[1] ?? undefined;

  return userId;
};

export const setUserIdToCookie = (): void => {
  const newCookies = `userId=abc-123;`;
  document.cookie = newCookies;
};

export const removeUserIdFromCookie = (): void => {
  document.cookie = 'userId=; max-age=0';
  window.location.reload();
};
