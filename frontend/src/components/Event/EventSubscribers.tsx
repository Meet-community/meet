import { FC, memo } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import ListItemButton from '@mui/material/ListItemButton';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import styles from './Event.module.scss';

interface Participant {
  id: number,
  firstName: string,
  lastName: string,
  avatar?: string | null,
  email: string,
  telegram?: string | null,
  facebook?: string | null,
  instagram?: string | null
}

interface Props {
  participants: Participant[];
}

export const EventSubscribers: FC<Props> = memo((props) => {
  const { participants } = props;

  return (
    <List
      dense
      sx={{
        width: '100%',
        overflow: 'auto',
        maxHeight: 300,
      }}
    >
      {participants.map((person) => {
        const labelId = `checkbox-list-secondary-label-${person}`;

        return (
          <ListItem
            key={person.id}
            sx={{
              paddingRight: '0px',
              '.MuiListItem-button-root': { xs: { paddingLeft: '0' } },
              '.MuiListItemButton-root': { xs: { paddingLeft: '0' }, md: { paddingLeft: '12px' } },
            }}
            className={styles.item}
            secondaryAction={(
              <>
                {person.instagram && (
                  <IconButton
                    className={styles.icon}
                    href={`${person.instagram}`}
                    target='_blank'
                    aria-label="comment"
                  >
                    <InstagramIcon />
                  </IconButton>
                )}

                {person.telegram && (
                  <IconButton
                    className={styles.icon}
                    href={`${person.telegram}`}
                    target='_blank'
                    aria-label="comment"
                  >
                    <TelegramIcon />
                  </IconButton>
                )}

                {person.facebook && (
                  <IconButton
                    className={styles.icon}
                    href={`${person.facebook}`}
                    target='_blank'
                    aria-label="comment"
                  >
                    <FacebookIcon />
                  </IconButton>
                )}

                {!person.instagram && !person.telegram && !person.facebook && (
                  <IconButton
                    className={styles.icon}
                    sx={{ display: 'flex', alignItem: 'center', gap: '8px' }}
                  >
                    <SentimentVeryDissatisfiedIcon />
                  </IconButton>
                )}
              </>
            )}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={person.firstName}
                  src={person.avatar || '/static/images/avatar/1.jpg'}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${person.firstName} ${person.lastName}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
});
