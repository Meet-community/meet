import { useRouter } from 'next/router';
import { useAuthUserQuery } from '../../graphql/generated';
import { ROUTES } from '../../../../routes/routes';

export const useWithAuthPage = () => {
  const router = useRouter();

  useAuthUserQuery({
    onCompleted: async (data) => {
      if (!data.authUser) {
        await router.push(`/${ROUTES.signUp.index}`);
      }
    },
  });
};
