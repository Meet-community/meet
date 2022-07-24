import { useAuthUserQuery } from '../../graphql/generated';
import { useRouter } from 'next/router';

export const useWithAuthPage = () => {
  const router = useRouter()
  useAuthUserQuery({
    onCompleted: async (data) => {
      if(!data.authUser) {
        await router.push('./signIn')
      }
    }
  });
}
