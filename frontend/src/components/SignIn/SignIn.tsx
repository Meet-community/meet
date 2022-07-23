import React, { FC, useState } from 'react';
import {
  useSignInMutation
} from '../../controllers/graphql/generated';
import Link from 'next/link';

export const SignIn: FC = React.memo(() => {
  const [signIn] = useSignInMutation({
    onCompleted: res => console.log(res)
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInHandler = () => {
    signIn({ variables: { args: { email, password } } });
  }

    return (
      <div>

        <div style={{marginBottom: '32px'}}>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </div>

      <form onSubmit={e => {
        e.preventDefault();
        signInHandler();
      }}>
        <h1>SignIn</h1>

        <div style={{ padding: '16px' }}>
          <input placeholder={'Email'} onChange={e => setEmail(e.target.value)}
                 type="text"/>
        </div>

        <div style={{ padding: '16px' }}>
          <input placeholder={'Password'}
                 onChange={e => setPassword(e.target.value)} type="text"/>
        </div>

        <button type="submit">SignIn</button>
      </form>
      </div>
    );
  }
)
  ;
