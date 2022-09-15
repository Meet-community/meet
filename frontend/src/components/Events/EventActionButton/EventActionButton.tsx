import React, { FC, useMemo } from 'react';
import { EventFullFragment } from '../../../controllers/graphql/generated';
import { useAuthUser } from '../../../controllers/entities/user/useAuthUserHook';
import { CancelEventButton } from './CancelEventButton/CancelEventButton';
import { SubscribeButton } from './SubscribeButton/SubscribeButton';

interface Props {
  event: EventFullFragment
}

export const EventActionButton: FC<Props> = React.memo((props) => {
  const { event } = props;
  const authUser = useAuthUser();

  const isOwner = useMemo(() => (
    event.creatorId === authUser?.id
  ), [authUser?.id, event.creatorId]);

  const isEventStarted = useMemo(() => {
    const today = new Date();

    return today.getTime() > new Date(event.startAt).getTime();
  }, [event.startAt]);

  return isOwner
    ? <CancelEventButton event={event} disabled={isEventStarted} />
    : <SubscribeButton event={event} disabled={isEventStarted} />;
});
