import React, {
  FC, memo, useCallback, useMemo,
} from 'react';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { LoadingButton } from '@mui/lab';
import { useEventSubscribe } from '../../../../hooks/useEventSubscribe';
import { EventFullFragment } from '../../../../controllers/graphql/generated';
import {
  useAuthUser,
} from '../../../../controllers/entities/user/useAuthUserHook';

interface Props {
  event: EventFullFragment;
  disabled?: boolean;
}

export const SubscribeButton: FC<Props> = memo((props) => {
  const { event, disabled = false } = props;
  const authUser = useAuthUser();

  const isParticipant = useMemo(() => (
    event.participants.some((p) => p.id === authUser?.id)
  ), [authUser?.id, event.participants]);

  const {
    unSubscribeHandler,
    subscribeHandler,
    isLoading,
  } = useEventSubscribe();

  const onSubscribe = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (isParticipant) {
      unSubscribeHandler(event.id);
    } else {
      subscribeHandler(event.id);
    }
  }, [event.id, isParticipant, subscribeHandler, unSubscribeHandler]);

  if (isParticipant) {
    return (
      <LoadingButton
        variant="outlined"
        color="warning"
        onClick={onSubscribe}
        loading={isLoading}
        disabled={disabled}
        endIcon={<GroupRemoveIcon />}
      >
        Відписатись
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      variant="contained"
      color="success"
      onClick={onSubscribe}
      loading={isLoading}
      endIcon={<GroupAddIcon />}
      disabled={disabled}
    >
      Підписатись
    </LoadingButton>
  );
});
