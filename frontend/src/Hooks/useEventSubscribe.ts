import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  useCreateUserEventMutation,
  UserEventStatus,
} from '../controllers/graphql/generated';
import { useAuthUser } from '../controllers/entities/user/useAuthUserHook';

export const useEventSubscribe = () => {
  const router = useRouter();
  const authUser = useAuthUser();

  const { id } = router.query;
  const eventId = Number(id);

  const isParticipant = authUser
    ? eventId === authUser.id
    : false;

  const [subscribeToEvent] = useCreateUserEventMutation({
    onError: (e) => window.alert(e.message),
  });

  const subscribeHandler = useCallback(async () => {
    await subscribeToEvent({ variables: { args: { eventId } } });
  }, [eventId, subscribeToEvent]);

  const unSubscribeHandler = useCallback(async () => {
    await subscribeToEvent({
      variables: {
        args: {
          eventId, status: UserEventStatus.Canceled,
        },
      },
    });
  }, [eventId, subscribeToEvent]);

  const handleSubscribe = isParticipant ? unSubscribeHandler : subscribeHandler;

  return {
    handleSubscribe,
  };
};
