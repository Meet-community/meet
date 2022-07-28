import {
  useSubscribeToEventMutation,
  useUnsubscribeToEventMutation,
} from '../controllers/graphql/generated';

export const useEventSubscribe = () => {
  const [
    subscribeToEvent,
    { loading: subscribeLoading },
  ] = useSubscribeToEventMutation({
    // eslint-disable-next-line no-alert
    onError: (e) => window.alert(e.message),
  });
  const [
    unsubscribeToEvent,
    { loading: unsubscribeLoading },
  ] = useUnsubscribeToEventMutation({
    // eslint-disable-next-line no-alert
    onError: (e) => window.alert(e.message),
  });

  const subscribeHandler = (eventId: number) => {
    subscribeToEvent({ variables: { eventId } });
  };

  const unSubscribeHandler = (eventId: number) => {
    unsubscribeToEvent({ variables: { eventId } });
  };

  return {
    subscribeHandler,
    unSubscribeHandler,
    subscribeLoading,
    unsubscribeLoading,
  };
};
