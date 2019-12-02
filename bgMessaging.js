import Api from './src/firebase/notifications';

export default async message => {
  // handle your message
  const Notificacion = Api.getInstance();
  Notificacion.displayNotification(message);
  return Promise.resolve();
};
