import React, { FC } from 'react';
import { Alert } from '@mui/lab';

export const EmptyMessage: FC = React.memo(() => {
  return (
    <Alert severity="warning">
      {`Unfortunately that's all, try using another search query in English`}
    </Alert>
  );
});
