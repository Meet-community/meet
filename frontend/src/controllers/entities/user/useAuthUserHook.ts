import { useAuthUserQuery } from '../../graphql/generated';

export const useAuthUser = () => {
  const { data } = useAuthUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  return data?.authUser || null;
}
