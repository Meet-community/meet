import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, Paper, Skeleton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon
  from '@mui/icons-material/SentimentVeryDissatisfied';
import Link from 'next/link';
import styles from './Activate.module.scss';
import { useActivateUserMutation } from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';

export const Activate: FC = React.memo(() => {
  const router = useRouter();
  const { token } = router.query;
  const [isOk, setIsOk] = useState(false);

  const [activate, { loading, error }] = useActivateUserMutation({
    onError: () => { /* empty */ },
    onCompleted: () => {
      setIsOk(true);
      setTimeout(() => router.push(`/${ROUTES.signIn}`), 5000);
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
            >
              {loading && (
                'Email confirmation'
              )}
              {isOk && (
                'Congratulations!'
              )}
              {error && ('Oops...')}
            </Typography>
            <Typography
              component='p'
              variant='overline'
              textAlign='center'
              mb={7}
            >
              {loading && (
                'We are already checking your email...'
              )}
              {isOk && (
                'Your email has already been confirmed. You can now login to the application.\n Auto redirect after 5 seconds.'
              )}
              {error && (
                'Something went wrong. The link is invalid or out of date. Try to signUp again.'
              )}

            </Typography>
            {loading && <Skeleton height='100px' width='100%' />}
            {isOk && (
              <div style={{ marginBottom: '40px' }} className={styles.center}>
                <CheckCircleOutlineIcon
                  color='success'
                  fontSize='large'
                  style={{ transform: 'scale(4)' }}
                />
              </div>
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
                      Sign up
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
