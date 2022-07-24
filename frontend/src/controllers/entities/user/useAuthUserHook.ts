import { useAuthUserQuery } from '../../graphql/generated';

export const useAuthUser = () => {
  const { data } = useAuthUserQuery();

  return data?.authUser || null;
}
