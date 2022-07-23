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
  startAt: Scalars['Date'];
  status: VacancyStatus;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Event>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export enum VacancyStatus {
  Canceled = 'CANCELED',
  Pending = 'PENDING'
}

export type EventFullFragment = { __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string } };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, creatorId: number, title: string, description: string, startAt: any, endAt: any, logo?: string | null, capacity: number, minCapacity: number, status: VacancyStatus, creator: { __typename?: 'User', id: number, firstName: string, lastName: string } }> };

export type UserFullFragment = { __typename?: 'User', id: number, firstName: string, lastName: string };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> };

export const UserFullFragmentDoc = /*#__PURE__*/ gql`
    fragment UserFull on User {
  id
  firstName
  lastName
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
}
    ${UserFullFragmentDoc}`;
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
export const UsersDocument = /*#__PURE__*/ gql`
    query users {
  users {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;