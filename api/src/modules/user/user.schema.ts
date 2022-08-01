import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  
  type Query {
    authUser: User
  }
  
  type Mutation {
    signUp(args: SignUpArgs!): User!
    activateUser(token: String!): User!
    signIn(args: SignInArgs!): User!
    logOut: Boolean!
    updateUserAvatar(args: UpdateUserAvatarArgs): User!
  }
  
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String
    status: UserStatus!
    avatar: String
  }
  
  enum UserStatus {
    PENDING
    CONFIRMED
  }

  input SignUpArgs {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  
  input SignInArgs {
    email: String!
    password: String!
  }
  
  scalar Upload
  
  input UpdateUserAvatarArgs {
    file: Upload!
  }
`;
