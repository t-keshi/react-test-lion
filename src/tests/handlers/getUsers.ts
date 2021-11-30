import { ResponseResolver, RestContext, RestRequest, DefaultRequestBody } from 'msw';
import { FetchUsersResponse } from '../../models';
import db from '../data/db';

export const getUsers: ResponseResolver<
  RestRequest<DefaultRequestBody>,
  RestContext,
  FetchUsersResponse
> = (_, res, ctx) => {
  const users = db.users.getAll();

  if (users.length === 0) {
    return res(ctx.status(500));
  }

  const usersRes = users.map(({ id, name, email, profile }) => ({ id, name, email, profile }));

  return res(ctx.json(usersRes));
};
