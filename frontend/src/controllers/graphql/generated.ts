import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Event = {
  __typename?: 'Event';
  capacity: Scalars['Int'];
  creator: User;
  creatorId: Scalars['Int'];
  description: Scalars['String'];
  endAt: Scalars['Date'];
  id: Scalars['Int'];
  logo?: Maybe<Scalars['String']>;
  minCapacity: Scalars['Int'];
  participants: Array<User>;
  startAt: Scalars['Date'];
  status: VacancyStatus;
  title: Scalars['String'];
};

export type ForgotUserPassword = {
  email: Scalars['String'];
  temporaryPassword: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateTemporaryPassword: Scalars['Boolean'];
  activateUser: User;
  forgotUserPassword: Scalars['Boolean'];
  logOut: Scalars['Boolean'];
  signIn: User;
  signUp: User;
  subscribeToEvent: Event;
  unsubscribeToEvent: Event;
  updateUser: User;
  updateUserAvatar: User;
  updateUserPassword: User;
};


export type MutationActivateTemporaryPasswordArgs = {
  token: Scalars['String'];
};


export type MutationActivateUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotUserPasswordArgs = {
  args: ForgotUserPassword;
};


export type MutationSignInArgs = {
  args: SignInArgs;
};


export type MutationSignUpArgs = {
  args: SignUpArgs;
};


export type MutationSubscribeToEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationUnsubscribeToEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  args: UpdateUserArgs;
};


export type MutationUpdateUserAvatarArgs = {
  args?: InputMaybe<UpdateUserAvatarArgs>;
};


export type MutationUpdateUserPasswordArgs = {
  args: UpdateUserPasswordArgs;
};

export type Query = {
  __typename?: 'Query';
  authUser?: Maybe<User>;
  event: Event;
  events: Array<Event>;
  userEvents: Array<UserEvent>;
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};

export type SignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserAvatarArgs = {
  file: Scalars['Upload'];
};

export type UpdateUserPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  status: UserStatus;
  temporaryPassword?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type UserEvent = {
  __typename?: 'UserEvent';
  eventId: Scalars['Int'];
  id: Scalars['Int'];
  status: UserEventStatus;
  user: User;
  userId: Scalars['Int'];
};

export enum UserEventStatus {
  Canceled = 'CANCELED',
  Pending = 'PENDING',
  Violated = 'VIOLATED'
}

export enum UserStatus {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export enum VacancyStatus {
  Canceled = 'CANCELED',
  Pending = 'PENDING'
}

export type EventFullFragment = { __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }> };

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }> } };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }> }> };

export type UserFullFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null };

export type ActivateTemporaryPasswordMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateTemporaryPasswordMutation = { __typename?: 'Mutation', activateTemporaryPassword: boolean };

export type ActivateUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type AuthUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUserQuery = { __typename?: 'Query', authUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: boolean };

export type SignInMutationVariables = Exact<{
  args: SignInArgs;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type SignUpMutationVariables = Exact<{
  args: SignUpArgs;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type UpdateUserPasswordMutationVariables = Exact<{
  args: UpdateUserPasswordArgs;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  args: UpdateUserArgs;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type UpdateUserAvatarMutationVariables = Exact<{
  args: UpdateUserAvatarArgs;
}>;


export type UpdateUserAvatarMutation = { __typename?: 'Mutation', updateUserAvatar: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } };

export type SubscribeToEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type SubscribeToEventMutation = { __typename?: 'Mutation', subscribeToEvent: { __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }> } };

export type UnsubscribeToEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type UnsubscribeToEventMutation = { __typename?: 'Mutation', unsubscribeToEvent: { __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null }> } };

export type UserEventFragment = { __typename?: 'UserEvent', id: number, userId: number, eventId: number, status: UserEventStatus };

export const UserFullFragmentDoc = /*#__PURE__*/ gql`
    fragment UserFull on User {
  id
  firstName
  lastName
  avatar
}
    `;
export const EventFullFragmentDoc = /*#__PURE__*/ gql`
    fragment EventFull on Event {
  id
  creatorId
  title
  description
  startAt
  endAt
  logo
  capacity
  minCapacity
  status
  creator {
    ...UserFull
  }
  participants {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export const UserEventFragmentDoc = /*#__PURE__*/ gql`
    fragment UserEvent on UserEvent {
  id
  userId
  eventId
  status
}
    `;
export const EventDocument = /*#__PURE__*/ gql`
    query event($id: Int!) {
  event(id: $id) {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventsDocument = /*#__PURE__*/ gql`
    query events {
  events {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const ActivateTemporaryPasswordDocument = /*#__PURE__*/ gql`
    mutation activateTemporaryPassword($token: String!) {
  activateTemporaryPassword(token: $token)
}
    `;
export type ActivateTemporaryPasswordMutationFn = Apollo.MutationFunction<ActivateTemporaryPasswordMutation, ActivateTemporaryPasswordMutationVariables>;

/**
 * __useActivateTemporaryPasswordMutation__
 *
 * To run a mutation, you first call `useActivateTemporaryPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateTemporaryPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateTemporaryPasswordMutation, { data, loading, error }] = useActivateTemporaryPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateTemporaryPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ActivateTemporaryPasswordMutation, ActivateTemporaryPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateTemporaryPasswordMutation, ActivateTemporaryPasswordMutationVariables>(ActivateTemporaryPasswordDocument, options);
      }
export type ActivateTemporaryPasswordMutationHookResult = ReturnType<typeof useActivateTemporaryPasswordMutation>;
export type ActivateTemporaryPasswordMutationResult = Apollo.MutationResult<ActivateTemporaryPasswordMutation>;
export type ActivateTemporaryPasswordMutationOptions = Apollo.BaseMutationOptions<ActivateTemporaryPasswordMutation, ActivateTemporaryPasswordMutationVariables>;
export const ActivateUserDocument = /*#__PURE__*/ gql`
    mutation activateUser($token: String!) {
  activateUser(token: $token) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const AuthUserDocument = /*#__PURE__*/ gql`
    query authUser {
  authUser {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;

/**
 * __useAuthUserQuery__
 *
 * To run a query within a React component, call `useAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUserQuery(baseOptions?: Apollo.QueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
      }
export function useAuthUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUserQuery, AuthUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUserQuery, AuthUserQueryVariables>(AuthUserDocument, options);
        }
export type AuthUserQueryHookResult = ReturnType<typeof useAuthUserQuery>;
export type AuthUserLazyQueryHookResult = ReturnType<typeof useAuthUserLazyQuery>;
export type AuthUserQueryResult = Apollo.QueryResult<AuthUserQuery, AuthUserQueryVariables>;
export const LogOutDocument = /*#__PURE__*/ gql`
    mutation logOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const SignInDocument = /*#__PURE__*/ gql`
    mutation signIn($args: SignInArgs!) {
  signIn(args: $args) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = /*#__PURE__*/ gql`
    mutation signUp($args: SignUpArgs!) {
  signUp(args: $args) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateUserPasswordDocument = /*#__PURE__*/ gql`
    mutation updateUserPassword($args: UpdateUserPasswordArgs!) {
  updateUserPassword(args: $args) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserDocument = /*#__PURE__*/ gql`
    mutation updateUser($args: UpdateUserArgs!) {
  updateUser(args: $args) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserAvatarDocument = /*#__PURE__*/ gql`
    mutation updateUserAvatar($args: UpdateUserAvatarArgs!) {
  updateUserAvatar(args: $args) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type UpdateUserAvatarMutationFn = Apollo.MutationFunction<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>;

/**
 * __useUpdateUserAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateUserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAvatarMutation, { data, loading, error }] = useUpdateUserAvatarMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateUserAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>(UpdateUserAvatarDocument, options);
      }
export type UpdateUserAvatarMutationHookResult = ReturnType<typeof useUpdateUserAvatarMutation>;
export type UpdateUserAvatarMutationResult = Apollo.MutationResult<UpdateUserAvatarMutation>;
export type UpdateUserAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>;
export const SubscribeToEventDocument = /*#__PURE__*/ gql`
    mutation subscribeToEvent($eventId: Int!) {
  subscribeToEvent(eventId: $eventId) {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;
export type SubscribeToEventMutationFn = Apollo.MutationFunction<SubscribeToEventMutation, SubscribeToEventMutationVariables>;

/**
 * __useSubscribeToEventMutation__
 *
 * To run a mutation, you first call `useSubscribeToEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToEventMutation, { data, loading, error }] = useSubscribeToEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useSubscribeToEventMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToEventMutation, SubscribeToEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToEventMutation, SubscribeToEventMutationVariables>(SubscribeToEventDocument, options);
      }
export type SubscribeToEventMutationHookResult = ReturnType<typeof useSubscribeToEventMutation>;
export type SubscribeToEventMutationResult = Apollo.MutationResult<SubscribeToEventMutation>;
export type SubscribeToEventMutationOptions = Apollo.BaseMutationOptions<SubscribeToEventMutation, SubscribeToEventMutationVariables>;
export const UnsubscribeToEventDocument = /*#__PURE__*/ gql`
    mutation unsubscribeToEvent($eventId: Int!) {
  unsubscribeToEvent(eventId: $eventId) {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;
export type UnsubscribeToEventMutationFn = Apollo.MutationFunction<UnsubscribeToEventMutation, UnsubscribeToEventMutationVariables>;

/**
 * __useUnsubscribeToEventMutation__
 *
 * To run a mutation, you first call `useUnsubscribeToEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeToEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeToEventMutation, { data, loading, error }] = useUnsubscribeToEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useUnsubscribeToEventMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeToEventMutation, UnsubscribeToEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeToEventMutation, UnsubscribeToEventMutationVariables>(UnsubscribeToEventDocument, options);
      }
export type UnsubscribeToEventMutationHookResult = ReturnType<typeof useUnsubscribeToEventMutation>;
export type UnsubscribeToEventMutationResult = Apollo.MutationResult<UnsubscribeToEventMutation>;
export type UnsubscribeToEventMutationOptions = Apollo.BaseMutationOptions<UnsubscribeToEventMutation, UnsubscribeToEventMutationVariables>;