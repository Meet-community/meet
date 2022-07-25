import { useRouter } from 'next/router';
import { useAuthUserQuery } from '../../graphql/generated';

export const useWithAuthPage = () => {
  const router = useRouter();

  useAuthUserQuery({
    onCompleted: async (data) => {
      if (!data.authUser) {
        // TODO: Add routes const (sergio)
        await router.push('./signIn');
      }
    },
  });
};
