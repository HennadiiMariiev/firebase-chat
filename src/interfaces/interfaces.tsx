import { FirebaseApp } from 'firebase/app';

export interface IProps {
  app: FirebaseApp;
}

export interface INotifyProps {
  from: string;
  uid: string;
  text: string;
  currentUId: string;
}
