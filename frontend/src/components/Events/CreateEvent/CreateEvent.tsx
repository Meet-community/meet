import React, { FC } from 'react';
import { EventForm } from './EventForm/EventForm';

export const CreateEvent: FC = React.memo(() => {
  return (
    <div>
      <EventForm
        onSubmit={(v) => {
          return Promise.resolve(v);
        }}
        defaultValues={{}}
      />
    </div>
  );
});
