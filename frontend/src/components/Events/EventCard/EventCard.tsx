import { FC, memo } from 'react';
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardMedia,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Group } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import styles from './EventCard.module.scss';
import { formatDate } from '../../helpers/date/formateDate';
import { EventFullFragment } from '../../../controllers/graphql/generated';
import { ROUTES } from '../../../../routes/routes';
import { SubscribeButton } from '../../../ui/SubscribeButton/SubscribeButton';

interface Props {
  event: EventFullFragment;
  isParticipant: boolean;
}

export const EventCard: FC<Props> = memo((props) => {
  const { event, isParticipant } = props;

  const disableSubscribe = !isParticipant
    && event.participants.length
    >= event.capacity;

  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box>
        <ImageListItem sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="180"
            image={event.logo ? event.logo : '/static/images/cards/contemplative-reptile.jpg'}
            alt="Event Logo"
          />

          <ImageListItemBar
            title={event.title}
            subtitle={`@${event.creator.firstName} ${event.creator.lastName}`}
            actionIcon={(
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${23}`}
              />
            )}
          />
        </ImageListItem>

        <CardContent>
          <div className={styles.creator}>
            <Typography gutterBottom variant="h5" component="div">
              {formatDate(event.startAt.valueOf())}
            </Typography>
          </div>

          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.description}
          >
            {event.description}
          </Typography>

          <div className={styles.participants}>
            {event.participants.length > 0 && (
            <AvatarGroup max={4}>
              {event.participants.map((person) => (
                <Avatar
                  alt={`${person.firstName} ${person.lastName}`}
                  src={person.avatar || '/static/images/avatar/1.jpg'}
                />
              ))}
            </AvatarGroup>
            )}

            {event.participants.length === 0 && (
              <Typography className={styles.subtitle}>
                <Group />

                Participants
              </Typography>
            )}

            <Typography className={styles.subtitle}>
              {`${event.participants.length} out of ${event.capacity}`}
            </Typography>
          </div>

          <div className={styles.groupButton}>
            <Button
              variant="contained"
              onClick={() => router.push(`${ROUTES.events}/${event.id}`)}
              endIcon={<ReadMoreIcon />}
            >
              Show more
            </Button>

            <SubscribeButton
              isSubscribed={isParticipant}
              disabled={disableSubscribe}
              eventId={event.id}
            />
          </div>
        </CardContent>
      </Box>
    </Card>
  );
});