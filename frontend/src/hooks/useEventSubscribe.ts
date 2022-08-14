import { ApolloError, FetchResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  SubscribeToEventMutation, UnsubscribeToEventMutation,
  useSubscribeToEventMutation,
  useUnsubscribeToEventMutation,
} from '../controllers/graphql/generated';
import { getUrl } from '../helpers/getUrl';
import { ROUTES } from '../../routes/routes';
import { APOLLO_ERROR } from '../controllers/apollo/Error.constans';

interface HookOutput {
  subscribeHandler: (eventId: number) => (
    Promise<FetchResult<SubscribeToEventMutation, Record<string, any>, Record<string, any>>>
  );
  unSubscribeHandler: (eventId: number) => (
    Promise<FetchResult<UnsubscribeToEventMutation, Record<string, any>, Record<string, any>>>
  );
  isLoading: boolean;
}

export const useEventSubscribe = (): HookOutput => {
  const router = useRouter();

  const onError = useCallback((e: ApolloError) => {
    if (e.message === APOLLO_ERROR.NotAuthorize) {
      router.push(getUrl(ROUTES.signUp.index));
    }
  }, [router]);

  const [subscribeToEvent, { loading: subscribeLoading }] = useSubscribeToEventMutation(
    { onError },
  );
  const [unsubscribeToEvent, { loading: unsubscribeLoading }] = useUnsubscribeToEventMutation(
    { onError },
  );

  const subscribeHandler = useCallback((eventId: number) => (
    subscribeToEvent({ variables: { eventId } })
  ), [subscribeToEvent]);

  const unSubscribeHandler = useCallback((eventId: number) => (
    unsubscribeToEvent({ variables: { eventId } })
  ), [unsubscribeToEvent]);

  return {
    subscribeHandler,
    unSubscribeHandler,
    isLoading: unsubscribeLoading || subscribeLoading,
  };
};
