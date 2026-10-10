import {
  getMessaging,
  onMessage,
  onTokenRefresh,
  getToken,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import notifee, {AndroidImportance} from '@notifee/react-native';

const messaging = getMessaging(getApp());

/**
 * Create Notifee notification channel
 */
export async function createNotificationChannel() {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
    });
    console.log('Default channel created:', channelId);
    return channelId;
  } catch (err) {
    console.error('Error creating channel:', err);
  }
}

/**
 * Display a local notification using Notifee
 */
export async function displayLocalNotification(remoteMessage) {
  try {
    const {title, body} = remoteMessage?.notification || {};
    const data = remoteMessage?.data || {};
    await notifee.displayNotification({
      title: title || 'New Notification',
      body: body || '',
      android: {
        channelId: 'default',
        pressAction: {id: 'default'},
      },
    });
    console.log('Displayed notification:', { title, body, data });
  } catch (err) {
    console.error('Error displaying notification:', err);
  }
}

/**
 * Initialize Firebase Cloud Messaging + Notifee
 */
export async function initializeNotificationService() {
  await createNotificationChannel();

  // Register background handler
  setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log('Background message:', remoteMessage);
  });

  // Foreground handler
  const unsubscribe = onMessage(messaging, async remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    const { data } = remoteMessage;
    if (data) {
      console.log('📦 Payload data:', data);
    }

  });

  // Token setup
  const token = await getToken(messaging);
  console.log('FCM Token:', token);

  onTokenRefresh(messaging, newToken => {
    console.log('Token refreshed:', newToken);
  });

  // Handle background tap
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Opened from background:', remoteMessage.notification);
    handleNotificationTap(remoteMessage.data);
  });

  // Handle quit state tap
  const initial = await messaging().getInitialNotification();
  if (initial) {
    console.log('Opened from quit state:', initial.notification);
    handleNotificationTap(initialNotification.data);
  }

  return unsubscribe;
}

function handleNotificationTap(data) {
  if (!data) return;
  console.log('Handling notification tap:', data);

  // switch (data.type) {
  //   case 'ORDER_STATUS_UPDATE':
  //     // Example: navigate to order details screen
  //     console.log(`Navigate to Order #${data.orderId} details`);
  //     break;
  //   case 'PROMO':
  //     console.log('Show promotion screen');
  //     break;
  //   default:
  //     console.log('No handler for this type');
  // }
}