import React, { FC, useState } from 'react';
import { Paper } from '@mui/material';
import { EventFormValues } from './eventForm.typedfs';
import styles from './EventForm.module.scss';
import { LoadEventLogo } from './Image/LoadEventLogo';

interface Props {
  onSubmit: (v: EventFormValues) => Promise<any>;
  defaultValues: Partial<EventFormValues>
}

export const EventForm: FC<Props> = React.memo(() => {
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div>
      <Paper
        className={styles.content}
        elevation={10}
        sx={{ borderRadius: { xs: '0', md: '16px' }, overflow: 'hidden' }}
      >
        <LoadEventLogo
          file={file}
          setFile={setFile}
          logo={logo}
          setLogo={setLogo}
        />
      </Paper>
    </div>
  );
});
