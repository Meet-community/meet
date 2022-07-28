import { FC, memo, useMemo } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { formatDate } from '../helpers/date/formateDate';
import { EventFullFragment } from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';
import styles from './EventCard.module.scss';

interface Props {
  event: EventFullFragment;
}

export const EventCard: FC<Props> = memo((props) => {
  const { event } = props;

  const router = useRouter();

  const formatDescription = useMemo(() => {
    return event.description.slice(0, 200);
  }, [event]);

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => router.push(`${ROUTES.events}/${event.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={event.logo ? event.logo : '/static/images/cards/contemplative-reptile.jpg'}
          alt="Event Logo"
        />

        <CardContent>
          <div className={styles.creator}>
            <Typography gutterBottom variant="h5" component="div">
              {`${event.creator.firstName} ${event.creator.lastName}`}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
              {formatDate(event.startAt.valueOf())}
            </Typography>
          </div>

          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {`${formatDescription}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
