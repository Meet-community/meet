import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useActivateUserMutation } from '../../controllers/graphql/generated';

export const Activate: FC = React.memo(() => {
  const router = useRouter();
  const { token } = router.query;
  const [isOk, setIsOk] = useState(false);

  const [activate, { error }] = useActivateUserMutation({
    onError: () => setTimeout(() => router.push('/'), 3000),
    onCompleted: () => {
      setIsOk(true);
      setTimeout(() => router.push('/'), 3000);
    }
  });


  useEffect(() => {
    if (token && typeof token === 'string') {
      activate({ variables: { token } })
    }
  }, [token, activate])

  return (
    <>
      <h1>Activate </h1>
      <p>{token}</p>
      {error && <h3 style={{ color: 'red' }}>{error.message}, auto redirect to home page after 3sec</h3>}
      {isOk && <h3 style={{ color: 'green' }}>Email confirmed, auto redirect to home page after 3sec</h3>}
    </>
  );
});
