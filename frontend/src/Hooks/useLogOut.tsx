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
    onCompleted: async (data) => {
      client.writeQuery<AuthUserQuery>({
        query: AuthUserDocument,
        data: {
          authUser: null,
        }
      })
    },
  });

  const logOutHandler = async () => {
    await logOut();
    await client.clearStore();
    await router.push('/');
  }

  return {
    logOutHandler,
  };
}
