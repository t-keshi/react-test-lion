import { ResponseResolver, RestContext, RestRequest, DefaultRequestBody } from 'msw';
import { FetchProfileResponse } from '../../models';
import db from '../data/db';

export const getProfile: ResponseResolver<
  RestRequest<DefaultRequestBody>,
  RestContext,
  FetchProfileResponse
> = (req, res, ctx) => {
  const { cookies } = req;
  const { userId } = cookies;
  if (userId === null) {
    return res(ctx.status(401));
  }

  const user = db.users.findFirst({
    where: {
      id: {
        equals: userId,
      },
    },
  });

  if (user === null) {
    return res(ctx.status(500));
  }

  const { id, name, email, profile } = user;

  return res(ctx.json({ id, name, email, profile }));
};
