import { DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { IProps } from '../interfaces/interfaces';

import { getMessageTime } from '../functions/getMessageTime';

export const ChatMessage = ({ message }: DocumentData, { app }: IProps) => {
  const auth = getAuth(app);
  const { text, uid, photoURL, createdAt, user } = message;

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  const messageTime = createdAt && getMessageTime(createdAt);

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="ava" />
      <div className="messageWrapper">
        <p className="messageTime">
          {user} &nbsp;• &nbsp;{messageTime}
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
};
