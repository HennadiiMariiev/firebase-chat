import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleIcon } from './GoogleIcon';

export const SignIn = () => {
  const auth = getAuth();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <React.Fragment>
      <button className="sign-in" onClick={signInWithGoogle}>
        <GoogleIcon />
        Sign In with Google
      </button>
    </React.Fragment>
  );
};
