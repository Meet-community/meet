import { gql } from 'apollo-server-core';

export const NoteSchema = gql`
  type Query {
    notes: [Note!]!
  }
  
  type Note {
    id: Int!
    note: String
  }
`
