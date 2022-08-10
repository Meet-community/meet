import React, { FC, memo, useCallback } from 'react';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { LoadingButton } from '@mui/lab';
import { useEventSubscribe } from '../../../hooks/useEventSubscribe';

interface Props {
  disabled: boolean;
  isSubscribed: boolean;
  eventId: number;
}

export const SubscribeButton: FC<Props> = memo((props) => {
  const { disabled, isSubscribed, eventId } = props;

  const {
    unSubscribeHandler,
    subscribeHandler,
    subscribeLoading,
    unsubscribeLoading,
  } = useEventSubscribe();

  const onSubscribe = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isSubscribed) {
      unSubscribeHandler(eventId);
    } else {
      subscribeHandler(eventId);
    }
  }, [eventId, isSubscribed, subscribeHandler, unSubscribeHandler]);

  return (
    <LoadingButton
      variant={isSubscribed ? 'outlined' : 'contained'}
      color={isSubscribed ? 'warning' : 'success'}
      onClick={onSubscribe}
      loading={unsubscribeLoading || subscribeLoading}
      disabled={disabled}
      endIcon={isSubscribed ? <GroupRemoveIcon /> : <GroupAddIcon />}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </LoadingButton>
  );
});
