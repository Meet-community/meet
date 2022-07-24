import { useLogOutMutation } from '../controllers/graphql/generated';
import { useApolloClient } from '@apollo/client';

export const useLogOut = () => {
  const client = useApolloClient();

  const [logOut] = useLogOutMutation();

  const logOutHandler = async () => {
    await logOut();
    await client.clearStore();
    document.location.reload();
  }
}
