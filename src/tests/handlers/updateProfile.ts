import { ResponseResolver, RestContext, RestRequest } from 'msw';
import db from '../data/db';

export const updateProfile: ResponseResolver<
  RestRequest<{ name: string; profile: string }>,
  RestContext
> = (req, res, ctx) => {
  const { cookies } = req;
  const { userId } = cookies;
  if (userId === null) {
    return res(ctx.status(401));
  }

  const { name, profile } = req.body;

  db.users.update({
    where: {
      id: {
        equals: userId,
      },
    },
    data: {
      name,
      profile,
    },
  });

  return res(ctx.json({ status: 200 }));
};
