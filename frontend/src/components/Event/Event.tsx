import React, { memo, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  CardMedia,
  ImageListItem,
  ImageListItemBar,
  Paper, Skeleton,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Group } from '@mui/icons-material';
import { useEventLazyQuery } from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';
import { formatDate } from '../helpers/date/formateDate';
import { EventCreator } from './EventCreator';
import styles from './Event.module.scss';
import { EventParticipants } from './EventParticipants';
import { GoogleMaps } from '../Events/CreateEvent/GoogleMaps/GoogleMaps';

export const Event = memo(() => {
  const router = useRouter();
  const { id: idFromQuery } = router.query;

  const id = useMemo(() => Number(idFromQuery), [idFromQuery]);

  const [loadEvent, { data, loading }] = useEventLazyQuery({
    onError: () => router.push(ROUTES.home),
  });

  const event = useMemo(() => (data?.event
    ? data.event
    : null
  ), [data]);

  const participants = useMemo(() => {
    const part = event?.participants.filter((person) => person.id !== event?.creator.id);

    if (part) {
      const ss = [...part];

      for (let i = 0; i < 10; i += 1) {
        if (event?.creator) {
          ss.push(event?.creator);
        }
      }

      return ss;
    }

    return part;
  }, [event?.creator, event?.participants]);

  useEffect(() => {
    if (!Number.isNaN(id) && !loading) {
      loadEvent({ variables: { id } });
    }
  }, [id, loadEvent, loading]);

  return (
    <Paper
      className={styles.box}
      elevation={10}
    >
      <Box>
        <ImageListItem sx={{ width: '100%' }}>
          {loading ? (
            <Skeleton
              sx={{ bgcolor: 'grey.900' }}
              variant="rectangular"
              width='100%'
              height='350px'
            />
          ) : (
            <CardMedia
              component="img"
              height="350px"
              image={event?.logo ? event.logo : ''}
              alt="Event Logo"
            />
          )}

          <ImageListItemBar
            subtitle={!event?.creator
              ? (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: '1rem', width: 100 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: '1rem', width: 100 }}
                  />
                </Box>
              )
              : (
                <Typography variant='h3'>
                  {event?.title}
                </Typography>
              )}
            actionIcon={(
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${23}`}
              />
            )}
          />
        </ImageListItem>
      </Box>

      <div className={styles.content}>
        <Typography mb='20px' variant='h5'>
          Detail info about Event
        </Typography>

        <Grid
          container
          rowGap='8px'
          sx={{ marginBottom: { xs: '16px', md: '20px' } }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography>
              {`Event starts at: ${formatDate(event?.startAt.valueOf())} -
                 ${formatDate(event?.endAt.valueOf(), 'hours')
              }`}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { sm: 'end' } }}
          >
            <Typography>
              {`City: ${event?.city.name}`}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            {event?.eventLink && event.eventLink}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { sm: 'end' } }}
          >
            <Typography className={styles.participants}>
              <Group />

              {`Participants ${event?.participants.length} out of ${event?.capacity}`}
            </Typography>
          </Grid>
        </Grid>

        <Typography mb='12px' variant='h5'>
          Description
        </Typography>

        <Typography sx={{ marginBottom: { xs: '20px', md: '24px' } }}>
          {event?.description}
        </Typography>

        <Typography mb='32px'>
          {event?.creator && <EventCreator creator={event.creator} />}
        </Typography>

        <Typography variant='h5' mb='12px'>
          Participants
        </Typography>

        {participants && <EventParticipants participants={participants} />}
      </div>

      <div className={styles.googleMaps}>
        <GoogleMaps placeId={event?.city.googleId} />
      </div>
    </Paper>
  );
});
