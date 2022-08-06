import React, { FC } from 'react';
import { EventForm } from './EventForm/EventForm';
import {
  CreateEventContextProvider,
} from './CreateEventContext/CreateEventContextProvider';

export const CreateEvent: FC = React.memo(() => {
  return (
    <CreateEventContextProvider>
      <EventForm
        onSubmit={(v) => {
          return Promise.resolve(v);
        }}
        defaultValues={{}}
      />
    </CreateEventContextProvider>
  );
});
