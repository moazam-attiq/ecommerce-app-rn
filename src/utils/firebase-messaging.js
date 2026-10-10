import { setBackgroundMessageHandler, getMessaging } from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('📦 Background event:', type, detail);

  if (type === EventType.ACTION_PRESS) {
    console.log('Notification action pressed:', detail.pressAction?.id);
  } else if (type === EventType.DISMISSED) {
    console.log('Notification dismissed.');
  }
});

setBackgroundMessageHandler(messaging, async remoteMessage => {
  try {
    console.log('📩 Background message:', remoteMessage);
    const { title, body } = remoteMessage?.notification || {};

    if (title || body) {
      await notifee.displayNotification({
        title: title || 'New message',
        body: body || '',
        android: { channelId: 'default' },
      });
    } else {
      console.log('ℹ️ No notification payload — skipping Notifee display.');
    }
  } catch (err) {
    console.error('❌ Error in background handler:', err);
  }
});