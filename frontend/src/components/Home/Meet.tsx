import { FC, memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useUsersQuery } from '../../controllers/graphql/generated';

export const Meet: FC = memo(() => {
  const { data, loading, error } = useUsersQuery();
  const users = useMemo(() => (data?.users
    ? data.users
    : []
  ), [data]);

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>

        <Link href="/home">
          <a>Go home</a>
        </Link>

        {loading && <h2>Loading...</h2>}

        {users.map(user => (
          <h2 key={user.lastName}>
            {`${user.firstName} ${user.lastName}`}
          </h2>
        ))}
      </main>
    </div>
  )
});
