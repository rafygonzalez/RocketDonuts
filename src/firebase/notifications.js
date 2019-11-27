import {messaging, notifications} from 'react-native-firebase';

export default class NotificationsAndroid {
  constructor() {
    this.messageListener = null;
    this.notification = new notifications.Notification();
  }
  onMessageListener() {
    this.messageListener = messaging().onMessage(async message => {
      console.log(message);
      const {titulo, descripcion, subtitle} = message.data;
      this.createChannel(
        'Nuevo Pedido',
        'Tu pedido',
        'Se utiliza para poder notificar el estado de cada pedido realizado por el usuario.',
      );
      await this.buildNotification(
        'Nuevo Pedido',
        titulo,
        descripcion,
        subtitle,
      );
      notifications().displayNotification(this.notification);
    });
  }
  buildNotification(id, title, body, subtitle) {
    return new Promise(resolve => {
      this.notification
        .setNotificationId(id)
        .setTitle(title)
        .setSubtitle(subtitle)
        .android.setBigText(body);
      //   .setBody(body)
      //  .setData(data); // Data tiene que ser un objeto ej: {key1:data}
      //  this.notification.android.setBigText('Prueba', 'Prueba', 'prueba');
      resolve(true);
    });
  }
  createChannel(channelId, channelDescription, message, type) {
    const channel = new notifications.Android.Channel(
      channelId,
      channelDescription,
      notifications.Android.Importance.High,
      //notifications.Android.Importance.High,
    ).setDescription(message);

    notifications().android.createChannel(channel);
    this.notification.android
      .setChannelId(channelId)
      .android.setSmallIcon('ic_launcher');
  }
}
