import ky from 'ky';
import { END_POINT } from '../../constants/endpoint';

export const kyBase = ky.create({
  headers: {
    Cache: 'no-cache',
  },
  retry: 0,
  prefixUrl: END_POINT,
  credentials: 'same-origin',
  mode: 'cors',
});

export const kyAuth = kyBase.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const allCoolies = document.cookie;

        const userId =
          allCoolies
            .split('; ')
            .find((row) => row.startsWith('userId='))
            ?.split('=')[1] ?? undefined;

        return request.headers.set('Cookie', `userId=${userId ?? ''}`);
      },
    ],
  },
});
