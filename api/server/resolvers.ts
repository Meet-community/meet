import { Ctx } from './typedefs';

interface User {
  firstName: string;
  lastName: string;
}

const users: User[] = [
  { firstName: 'Ihor', lastName: 'Karpyn' },
  { firstName: 'Sergio', lastName: 'Kirichenko' },
]

export const resolvers = {
  Query: {
    users: (_, __, ctx: Ctx) => {
      return ctx.models.User.findAll();
    },
  },
  User: {
    userName: (parent: User) => `${parent.firstName} ${parent.lastName}`
  }
}
