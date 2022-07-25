import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  AuthUserDocument,
  useLogOutMutation,
} from '../controllers/graphql/generated';

export const useLogOut = () => {
  const client = useApolloClient();
  const router = useRouter();

  const [logOut] = useLogOutMutation({
    refetchQueries: [
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
    onCompleted: async () => {
      await client.clearStore();
      await router.push('/signIn');
    },
  });

  const logOutHandler = async () => {
    await logOut();
  };

  return {
    logOutHandler,
  };
};
