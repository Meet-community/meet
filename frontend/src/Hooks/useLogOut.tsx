import {
  AuthUserDocument,
  AuthUserQuery,
  useLogOutMutation,
} from '../controllers/graphql/generated';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

export const useLogOut = () => {
  const client = useApolloClient();
  const router = useRouter();

  const [logOut] = useLogOutMutation({
    refetchQueries: [
      { query: AuthUserDocument }
    ],
    awaitRefetchQueries: true,
    onCompleted: async (data) => {
      await client.clearStore();
    },
  });

  const logOutHandler = async () => {
    await logOut();
  }

  return {
    logOutHandler,
  };
}
