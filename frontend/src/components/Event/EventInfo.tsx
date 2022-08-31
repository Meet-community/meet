import React, { FC, memo } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { EventFullFragment } from '../../controllers/graphql/generated';
import { formatDate } from '../helpers/date/formateDate';
import { EventActionButton } from '../Events/EventActionButton/EventActionButton';

interface Props {
  event: EventFullFragment | null;
  loading: boolean;
}

export const EventInfo: FC<Props> = memo((props) => {
  const { event, loading } = props;

  return (
    <>
      <Typography mb='20px' variant='h4' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Detail info about event

        {event && <EventActionButton event={event} />}
      </Typography>

      <Grid
        container
        rowGap='8px'
        sx={{ marginBottom: { xs: '16px', md: '20px' }, alignItems: 'center' }}
      >
        <Grid item xs={12} md={6}>
          <Typography component="p" variant="body1" color='text.secondary'>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ width: 305, height: 24 }}
              />
            )
              : `Event starts at: ${formatDate(event?.startAt.valueOf())} -
                 ${formatDate(event?.endAt.valueOf(), 'hours')
            }`}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          {event?.eventLink && (
            <Typography
              component="a"
              target="_blank"
              href={event.eventLink}
              variant="body2"
            >
              Event Link
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography sx={{ marginBottom: { xs: '20px', md: '40px' } }}>
        {event?.description}
      </Typography>
    </>
  );
});
