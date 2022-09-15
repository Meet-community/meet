import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Paper, Skeleton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon
  from '@mui/icons-material/SentimentVeryDissatisfied';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import { useApolloClient } from '@apollo/client';
import styles from './Activate.module.scss';
import { useActivateUserMutation } from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';
import { useSecondsTimer } from '../../hooks/useSecondsTimer';
import {
  AmplitudeAnalyticsEvents,
  useAmplitudeAnalytics,
} from '../../services/AmplitudeAnalystics/useAmplitudeAnalyticsEvents';

export const Activate: FC = React.memo(() => {
  const router = useRouter();
  const { token } = router.query;
  const [isOk, setIsOk] = useState(false);

  const { setUserId: setAmplitudeUserId, logEvent } = useAmplitudeAnalytics();
  const apollo = useApolloClient();
  const [runTimer, leftSeconds] = useSecondsTimer(
    8,
    () => router.push(`/${ROUTES.profile}`),
  );

  const [activate, { loading, error }] = useActivateUserMutation({
    onError: () => { /* empty */ },
    onCompleted: async (data) => {
      setAmplitudeUserId(data.activateUser);
      logEvent(AmplitudeAnalyticsEvents.EmailConfirmed);
      await apollo.clearStore();
      setIsOk(true);
      runTimer();
    },
  });

  useEffect(() => {
    if (token && typeof token === 'string') {
      activate({ variables: { token } });
    }
  }, [token, activate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <Paper elevation={24}>
          <div className={styles.modalWrapper}>
            <Typography
              variant='h2'
              textAlign='center'
              mb={2}
              className={styles.title}
            >
              {loading && (
                'Підтвердження на електроній пошті'
              )}
              {isOk && (
                'Вітаємо!'
              )}
              {error && ('Оой...')}
            </Typography>
            <Typography
              component='p'
              variant='overline'
              textAlign='center'
              mb={7}
            >
              {loading && (
                'Ми вже перевіряємо вашу електронну пошту...'
              )}
              {isOk && (
                `Ваша електронна адреса успішно підтверджена. Ви уже можете увійти у свій профіль.\n Автоматичне перенаправлення через ${leftSeconds} секунд.`
              )}
              {error && (
                'Щось пішло не так. Посилання недійсне або застаріле. Спробуйте зареєструватися ще раз.'
              )}

            </Typography>
            {loading && <Skeleton height='100px' width='100%' />}
            {isOk && (
              <>
                <div style={{ marginBottom: '60px' }} className={styles.center}>
                  <CheckCircleOutlineIcon
                    color='success'
                    fontSize='large'
                    style={{ transform: 'scale(4)' }}
                  />
                </div>
                <div className={styles.center}>
                  <Link href={`/${ROUTES.profile}`}>
                    <Button
                      size='large'
                      variant='outlined'
                      color='inherit'
                      endIcon={<PersonIcon />}
                    >
                      {`Персональні дані ${leftSeconds}`}
                    </Button>
                  </Link>
                </div>
              </>
            )}
            {error && (
              <>
                <div style={{ marginBottom: '60px' }} className={styles.center}>
                  <SentimentVeryDissatisfiedIcon
                    color='warning'
                    fontSize='large'
                    style={{ transform: 'scale(4)' }}
                  />
                </div>
                <div className={styles.center}>
                  <Link href="/signUp">
                    <Button
                      size='large'
                      variant='outlined'
                      color='inherit'
                    >
                      Зареєструватися
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
});
