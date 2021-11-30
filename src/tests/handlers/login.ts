import { ResponseResolver, RestContext, RestRequest, DefaultRequestBody } from 'msw';
import { testUser } from '../data/testUser';

export const login: ResponseResolver<RestRequest<DefaultRequestBody>, RestContext> = (
  _,
  res,
  ctx,
) => res(ctx.cookie('userId', testUser.id));
