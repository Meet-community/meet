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
    users: () => users,
  }
}
