import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  DocumentData,
    serverTimestamp,
    addDoc,
} from 'firebase/firestore';

import { ChatMessage } from './ChatMessage';
import { IProps } from '../interfaces/interfaces';
import { notifyMe } from '../functions/notify';

const idObj: DocumentData = { id: 'id' };

export const ChatRoom = ({ app }: IProps) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const oldMessages = useRef<DocumentData[]>(); 
  const messageRef = collection(db, 'messages');
  const q = query(messageRef, orderBy('createdAt', "asc"), limit(25));

  const [messages] = useCollectionData(q, idObj);
  const [formValue, setFormValue] = useState('');
  const emptyDiv = useRef<HTMLDivElement>(null);

  // This is absolutely not from best practice :D
  // It's better to use Firebase Cloud Message.
  useEffect(() => {
    if(oldMessages.current?.length !== messages?.length && Array.isArray(oldMessages.current) && Array.isArray(messages)) {
        const {user: from, uid, text} = messages!.slice(-1)?.[0];
      notifyMe({from, text, uid, currentUId: auth.currentUser?.uid!});
    }
    oldMessages.current = messages!;
  }, [messages, auth.currentUser?.uid])

  const sendMessage = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      const { uid, photoURL } = auth.currentUser!;
      await addDoc(collection(db, 'messages'), { text: formValue, createdAt: serverTimestamp(), uid, photoURL, user: auth.currentUser?.displayName });

      setFormValue('');
    } catch (error) {
        console.log('ChatRoom Error in sendMEssage()', error);
    } 
    emptyDiv!.current!.scrollIntoView({behavior: "smooth"});
  };
  
  return (
    <React.Fragment>
      <main>
        <div>{messages && messages.map((message) => <ChatMessage key={message?.createdAt * 1000} message={message} />)}</div>
        <div ref={emptyDiv}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button type="submit" className='send-button'>Send</button>
      </form>
    </React.Fragment>
  );
};
