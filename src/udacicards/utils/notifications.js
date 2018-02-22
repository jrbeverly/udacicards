import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { STORAGE_KEY } from 'storage/UdaciCards';

export function getNotification() {
  return AsyncStorage.getItem(STORAGE_KEY.NOTIFICATION).then(JSON.parse);
}

export function setNotification() {
  return getNotification().then((data) => {
    if (data === null) {
      return;
    }

    Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if (status !== 'granted') {
          return;
        }
        Notifications.cancelAllScheduledNotificationsAsync();

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        Notifications.scheduleLocalNotificationAsync(
          {
            title: 'Learn! Learn!',
            body: "Rise above it. Learn!",
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true,
            },
          },
          {
            time: tomorrow,
            repeat: 'day',
          }
        );

        AsyncStorage.setItem(STORAGE_KEY.NOTIFICATION, JSON.stringify(true));
      });
  });
};

export function clearNotification() {
  return AsyncStorage.removeItem(STORAGE_KEY.NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}
