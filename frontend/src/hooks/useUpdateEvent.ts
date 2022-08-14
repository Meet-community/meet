import { ApolloError, FetchResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  UpdateEventMutation,
  UpdateEventMutationVariables,
  useUpdateEventMutation,
} from '../controllers/graphql/generated';
import { getUrl } from '../helpers/getUrl';
import { ROUTES } from '../../routes/routes';
import { APOLLO_ERROR } from '../controllers/apollo/Error.constans';

interface HookOutput {
  updateEvent: (args: UpdateEventMutationVariables) => (
    Promise<FetchResult<UpdateEventMutation, Record<string, any>, Record<string, any>>>
  );
  isLoading: boolean;
}

export const useUpdateEvent = (): HookOutput => {
  const router = useRouter();

  const onError = useCallback((e: ApolloError) => {
    if (e.message === APOLLO_ERROR.NotAuthorize) {
      router.push(getUrl(ROUTES.signUp.index));
    }
  }, [router]);

  const [update, { loading }] = useUpdateEventMutation(
    { onError },
  );

  const updateEvent = useCallback((args: UpdateEventMutationVariables) => (
    update({ variables: args })
  ), [update]);

  return {
    updateEvent,
    isLoading: loading,
  };
};
