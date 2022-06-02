import { getAuth } from 'firebase/auth';

export const SignOut = () => {
  const auth = getAuth();

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};
