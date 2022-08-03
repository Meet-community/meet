import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { UpdateAvatar } from './Avatar/UpdateAvatar';
import { Container } from '../UI/Container/Container';
import styles from './Profile.module.scss';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { useWithAuthPage } from '../../controllers/entities/user/useWithAuthPage';
import { UpdateUserPassword } from './UpdateUserPassword/UpdateUserPassword';
import { UpdateUserNames } from './UpdateUserNames/UpdateUserNames';
import { ProfileUserInfo } from './ProfileUserInfo/ProfileUserInfo';
import { ConnectToSocial } from './ConnectToSocial/ConnectToSocial';

export const Profile: FC = React.memo(() => {
  const authUser = useAuthUser();

  useWithAuthPage();

  if (!authUser) {
    return null;
  }

  return (
    <Container pageTitle="Profile">
      <div>

        <Paper
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' } }}
        >
          <div className={styles.avatar}>
            <UpdateAvatar />

            <ProfileUserInfo />
          </div>

          <Typography
            sx={{ fontSize: { md: 24 } }}
            variant="h6"
            component="p"
          >
            Personal data
          </Typography>

          <UpdateUserNames />
        </Paper>

        <Paper
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' } }}
        >
          <UpdateUserPassword />
        </Paper>

        <Paper
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' } }}
        >
          <ConnectToSocial />
        </Paper>

      </div>
    </Container>
  );
});
