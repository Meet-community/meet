import { FC, memo } from 'react';
import {
  Avatar,
  AvatarGroup,
  Card, CardActionArea,
  CardContent,
  CardMedia,
  ImageListItem,
  ImageListItemBar, Paper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Group } from '@mui/icons-material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatDate } from '../../helpers/date/formateDate';
import { EventFullFragment } from '../../../controllers/graphql/generated';
import { ROUTES } from '../../../../routes/routes';
import { EventActionButton } from '../EventActionButton/EventActionButton';
import styles from './EventCard.module.scss';

const getEventByIdUrl = (id: number) => `/${ROUTES.events.index}/${id}`;

interface Props {
  event: EventFullFragment;
  isParticipant: boolean;
  isCreator: boolean;
}

export const EventCard: FC<Props> = memo((props) => {
  const { event, isCreator } = props;

  const router = useRouter();

  return (
    <Paper
      elevation={10}
      sx={{ borderRadius: { xs: '0', md: '16px' } }}
    >
      <CardActionArea>
        <Card
          onClick={() => router.push(getEventByIdUrl(event.id))}
        >
          <Box>
            <ImageListItem sx={{
              width: '100%',
              '.MuiImageListItemBar-positionTop': {
                paddingBottom: '20px',
              },
            }}
            >
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
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 16px',
                      gap: '4px',
                    }}
                  >
                    <LocationOnIcon />

                    {event.city.name}
                  </Typography>
                )}
              />

              {isCreator && (
                <ImageListItemBar
                  sx={{
                    color: '#ffa726',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, '
                      + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    '.MuiImageListItemBar-title': {
                      color: '#ffa726',
                    },
                  }}
                  title="Творець"
                  position="top"
                  actionIcon={(
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px',
                      }}
                    >
                      <StarBorderIcon />
                    </Typography>
                  )}
                  actionPosition="left"
                />
              )}
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
                      key={person.id}
                    />
                  ))}
                </AvatarGroup>
                )}

                {event.participants.length === 0 && (
                  <Typography className={styles.subtitle}>
                    <Group />

                    Учасники
                  </Typography>
                )}

                <Typography className={styles.subtitle}>
                  {`${event.participants.length} з ${event.capacity}`}
                </Typography>
              </div>

              <div className={styles.groupButton}>
                <Button
                  sx={{ flexGrow: 1 }}
                  color='info'
                  variant="outlined"
                  onClick={() => router.push(getEventByIdUrl(event.id))}
                  endIcon={<ReadMoreIcon />}
                >
                  Детальніше
                </Button>

                <EventActionButton event={event} />
              </div>
            </CardContent>
          </Box>
        </Card>
      </CardActionArea>
    </Paper>
  );
});
