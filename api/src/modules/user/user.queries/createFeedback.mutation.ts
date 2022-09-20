import gql from 'graphql-tag';

export const CREATE_FEEDBACK_MUTATION = gql`
  mutation createFeedback($args: CreateFeedBackArgs!) {
    createFeedback(args: $args)
  }
`;
