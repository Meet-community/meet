import React, { FC, memo, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Group } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import styles from './Event.module.scss';
import { EventCreator } from './EventCreator';
import { EventFullFragment } from '../../controllers/graphql/generated';
import { EventSubscribers } from './EventSubscribers';
import { useEventSubscribe } from '../../hooks/useEventSubscribe';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

interface Props {
  event: EventFullFragment | null;
}

export const EventParticipants: FC<Props> = memo((props) => {
  const { event } = props;
  const user = useAuthUser();

  const { subscribeHandler, isLoading } = useEventSubscribe();

  const participants = useMemo(() => {
    return event?.participants.filter((person) => person.id !== event?.creator.id);
  }, [event?.creator, event?.participants]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} order={{ md: 1 }}>
        <Typography mb='32px'>
          {event?.creator && <EventCreator creator={event.creator} />}
        </Typography>
      </Grid>

      <Grid item xs={12} md={8} order={{ md: 0 }}>
        <Typography variant='h5' mb='12px' sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          Participants

          <Group fontSize="medium" />
        </Typography>

        {participants && participants.length > 0
          ? <EventSubscribers participants={participants} />
          : (
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              There are no participants yet and you can be the first

              <LoadingButton
                className={styles.button}
                loading={isLoading}
                disabled={user?.id === event?.creator.id}
                onClick={() => {
                  if (event?.id) {
                    subscribeHandler(event.id);
                  }
                }}
              >
                <AddReactionIcon />
              </LoadingButton>
            </Typography>
          )}
      </Grid>
    </Grid>
  );
});
