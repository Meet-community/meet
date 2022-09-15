import React, { FC, memo, useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
  EventFullFragment,
  EventStatus,
} from '../../../../controllers/graphql/generated';
import { useUpdateEvent } from '../../../../hooks/useUpdateEvent';

interface Props {
  event: EventFullFragment;
  disabled?: boolean;
}

export const CancelEventButton: FC<Props> = memo((props) => {
  const { event, disabled = false } = props;
  const { updateEvent, isLoading } = useUpdateEvent();

  const onSubscribe = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    updateEvent({
      eventId: event.id,
      args: {
        status: event.status === EventStatus.Canceled
          ? EventStatus.Pending
          : EventStatus.Canceled,
      },
    });
  }, [updateEvent, event.id, event.status]);

  if (event.status === EventStatus.Pending) {
    return (
      <LoadingButton
        variant="outlined"
        color="error"
        onClick={onSubscribe}
        loading={isLoading}
        endIcon={<EventBusyIcon />}
        disabled={disabled}
      >
        Відмінити
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      variant="contained"
      color="success"
      onClick={onSubscribe}
      loading={isLoading}
      endIcon={<EventRepeatIcon />}
      disabled={disabled}
    >
      Активувати
    </LoadingButton>
  );
});
