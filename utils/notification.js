import { Notifications } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from 'expo-permissions';

export const NOTIFICATION_KEY = 'flashcards:notifications';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() =>
    Notifications.cancelAllScheduledNotificationsAsync(),
  );
};

export const createNotification = () => ({
  title: 'Complete a quiz!',
  body: "👋 don't forget to complete a quiz today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(17);
            tomorrow.setMinutes(30);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
