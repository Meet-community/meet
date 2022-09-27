import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useAuthUserQuery } from '../../graphql/generated';
import { ROUTES } from '../../../../routes/routes';

export const useWithAuthPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useAuthUserQuery({
    onCompleted: async (data) => {
      if (!data.authUser) {
        await router.push(`/${ROUTES.signUp.index}`);
        enqueueSnackbar('Спершу потрібно авторизуватись', { variant: 'info' });
      }
    },
  });
};
