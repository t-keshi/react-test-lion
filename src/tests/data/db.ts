import { factory, primaryKey } from '@mswjs/data';
import * as faker from 'faker';
import { testUser } from './testUser';

const db = factory({
  users: {
    id: primaryKey(String),
    name: String,
    email: String,
    profile: String,
  },
});

db.users.create(testUser);

for (let i = 0; i < 6; i += 1) {
  db.users.create({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    profile: faker.lorem.lines(2),
  });
}

export default db;
