import { FC, memo } from 'react';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { LoadingButton } from '@mui/lab';
import { useEventSubscribe } from '../../hooks/useEventSubscribe';

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

  return (
    <LoadingButton
      variant={isSubscribed ? 'outlined' : 'contained'}
      color={isSubscribed ? 'error' : 'success'}
      onClick={() => (isSubscribed
        ? unSubscribeHandler(eventId)
        : subscribeHandler(eventId)
      )}
      loading={unsubscribeLoading || subscribeLoading}
      disabled={disabled}
      endIcon={isSubscribed ? <GroupRemoveIcon /> : <GroupAddIcon />}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </LoadingButton>
  );
});
