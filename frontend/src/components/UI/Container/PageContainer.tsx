import React, { FC } from 'react';
import { CircularProgress, Paper } from '@mui/material';
import styles from './Container.module.scss';

interface Props {
  pageTitle?: string;
  isLoading?: boolean;
  children: JSX.Element;
}

export const PageContainer: FC<Props> = React.memo((props) => {
  const {
    pageTitle, isLoading = false, children,
  } = props;

  return (
    <Paper elevation={6} className={styles.container}>
      {pageTitle && (
      <h1 className={styles.title}>{pageTitle}</h1>
      )}
      {children}

      {isLoading && (
        <div className={styles.loader}>
          <CircularProgress size={80} />
        </div>
      )}
    </Paper>
  );
});
