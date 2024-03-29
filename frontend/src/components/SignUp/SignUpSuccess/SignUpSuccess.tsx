import React, { FC } from 'react';
import {
  Button, Paper,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import styles from './SignUpSuccess.module.scss';

export const SignUpSuccess: FC = React.memo(() => {
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
              Успішна реєстрація
            </Typography>
            <Typography
              component='p'
              variant='overline'
              textAlign='center'
              mb={7}
            >
              МИ НАДІСЛАЛИ НА ВАШУ ЕЛЕКТРОННУ ПОШТУ ПОСИЛАННЯ ДЛЯ ПІДТВЕРДЖЕННЯ.
              ПІДТВЕРДІТЬ, ЩОБ ЗАВЕРШИТИ РЕЄСТРАЦІЮ.
            </Typography>
            <div style={{ marginBottom: '60px' }} className={styles.center}>
              <ForwardToInboxIcon
                color='info'
                fontSize='large'
                style={{ transform: 'scale(4)' }}
              />
            </div>
            <div className={styles.center}>
              <Link href="/">
                <Button
                  size='large'
                  variant='outlined'
                  color='inherit'
                >
                  Головна сторінка
                </Button>
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
});
