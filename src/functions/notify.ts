import { INotifyProps } from '../interfaces/interfaces';

const iconUrl = window?.location?.origin + '/firebase-icon.png';

export function notifyMe({ from = 'user', text = '', uid, currentUId }: INotifyProps) {
  if (uid === currentUId) {
    return;
  }

  const title = `Message from ${from}`;
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification?.permission === 'granted') {
    // If it's okay let's create a notification
    const notification = new Notification(title, { body: text, icon: iconUrl });
    if (notification) {
    }
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification?.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        const notification = new Notification(title, { body: text, icon: iconUrl });
        if (notification) {
        }
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
