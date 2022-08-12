import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  AuthUserDocument,
  useLogOutMutation,
} from '../controllers/graphql/generated';
import { ROUTES } from '../../routes/routes';
import {
  useAmplitudeAnalytics,
} from '../services/AmplitudeAnalystics/useAmplitudeAnalytics';

export const useLogOut = () => {
  const client = useApolloClient();
  const router = useRouter();
  const { setUserId } = useAmplitudeAnalytics();

  const [logOut] = useLogOutMutation({
    refetchQueries: [
      { query: AuthUserDocument },
    ],
    awaitRefetchQueries: true,
    onCompleted: async () => {
      await client.clearStore();
      setUserId(null);
      await router.push(`/${ROUTES.signIn}`);
    },
  });

  const logOutHandler = async () => {
    await logOut();
  };

  return {
    logOutHandler,
  };
};
