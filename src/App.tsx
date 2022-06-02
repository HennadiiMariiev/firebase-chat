import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { SignOut } from './components/SignOut';
import { config } from './config/config';
import { SignIn } from './components/SignIn';
import { ChatRoom } from './components/ChatRoom';

import './App.css';

const app = initializeApp(config);
const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-wrapper">
          <img className="icon" src={`${window.location.origin}/firebase-icon.png`} alt="firebase icon" />
          <h1 className="main-header">Firebase-Chat</h1>
        </div>
        {user && <SignOut />}
      </header>
      <section>{user ? <ChatRoom app={app} /> : <SignIn />}</section>
    </div>
  );
}

export default App;
