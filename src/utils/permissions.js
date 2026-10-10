import {Platform, PermissionsAndroid} from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export async function requestAndroidNotificationPermission() {
  const Toast = useToast();
  if (Platform.OS !== 'android') return true;
  const apiLevel = Platform.constants?.Version || 0;
  // Only Android 13+ needs this runtime request
  if (apiLevel >= 33) {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('POST_NOTIFICATIONS permission granted');
        return true;
      } else {
        Toast.show('Notifications blocked', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
        return false;
      }
    } catch (err) {
      console.warn('Permission request failed', err);
      return false;
    }
  }
  return true;
}