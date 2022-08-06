import React, { FC } from 'react';
import { CircularProgress, Paper } from '@mui/material';
import styles from './PageContainer.module.scss';

interface Props {
  isLoading?: boolean;
  children: JSX.Element;
  style?: React.CSSProperties;
}

export const PageContainer: FC<Props> = React.memo((props) => {
  const {
    isLoading = false, children, style = {},
  } = props;

  return (
    <Paper elevation={6} className={styles.container} style={style}>
      {children}

      {isLoading && (
        <div className={styles.loader}>
          <CircularProgress size={80} />
        </div>
      )}
    </Paper>
  );
});
