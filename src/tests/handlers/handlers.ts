import { rest } from 'msw';
import { END_POINT } from '../../constants/endpoint';
import { getProfile } from './getProfile';
import { getUsers } from './getUsers';
import { login } from './login';
import { updateProfile } from './updateProfile';

export const handlers = [
  rest.post(`${END_POINT}/login`, login),
  rest.get(`${END_POINT}/profile`, getProfile),
  rest.post(`${END_POINT}/profile`, updateProfile),
  rest.get(`${END_POINT}/users`, getUsers),
];
