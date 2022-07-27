import { memo, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEventLazyQuery } from '../../controllers/graphql/generated';

export const Event = memo(() => {
  const router = useRouter();
  const { id: idFromQuery } = router.query;

  const id = useMemo(() => Number(idFromQuery), [idFromQuery]);

  const [loadEvent, { data, loading }] = useEventLazyQuery({
    onError: () => router.push('/'),
  });

  const event = useMemo(() => (data?.event
    ? data.event
    : null
  ), [data]);

  useEffect(() => {
    if (!Number.isNaN(id) && !loading) {
      loadEvent({ variables: { id } });
    }
  }, [id, loadEvent, loading]);

  return (
    <h1>{event?.id}</h1>
  );
});
