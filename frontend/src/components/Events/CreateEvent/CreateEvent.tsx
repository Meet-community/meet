import React, { FC, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import { EventForm } from './EventForm/EventForm';
import {
  useCreateEventContext,
} from './CreateEventContext/useCreateEventContext';
import {
  EventsDocument,
  useCreateEventMutation,
} from '../../../controllers/graphql/generated';
import { ROUTES } from '../../../../routes/routes';
import {
  useWithAuthPage,
} from '../../../controllers/entities/user/useWithAuthPage';

export const CreateEvent: FC = React.memo(() => {
  useWithAuthPage();
  const router = useRouter();
  const [create, { loading }] = useCreateEventMutation({
    onError: () => { /* empty */ },
    onCompleted: () => router.push(ROUTES.home),
    refetchQueries: [
      { query: EventsDocument },
    ],
  });

  const {
    logo,
    file,
    googleCity,
    googlePlace,
    eventLink,
    capacity,
    startAt,
    endAt,
    description,
    title,
    checkFields,
  } = useCreateEventContext();

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkFields()) {
      return;
    }

    if (!googleCity) {
      return;
    }

    const googleCityId = googleCity.placeId;
    const googlePlaceId = googlePlace?.placeId;

    create({
      variables: {
        args: {
          logo,
          logoFile: file,
          eventLink,
          title,
          endAt,
          description,
          googleCityId,
          startAt,
          googlePlaceId,
          capacity,
          minCapacity: capacity,
        },
      },
    });
  }, [
    capacity,
    checkFields,
    create,
    description,
    endAt,
    eventLink,
    file,
    googleCity,
    googlePlace?.placeId,
    logo,
    startAt,
    title,
  ]);

  return (
    <EventForm
      onSubmit={submitHandler}
      defaultValues={{}}
      loading={loading}
    />
  );
});
