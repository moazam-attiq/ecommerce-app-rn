/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useContext, useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './src/navigations/AppNavigator';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import {AuthProvider} from './src/contexts/AuthContext';
import {ThemeProvider} from './src/contexts/ThemeContext';
import {requestAndroidNotificationPermission} from './src/utils/permissions';
import {initializeNotificationService} from './src/utils/notificationService';
import {ToastProvider} from 'react-native-toast-notifications';
import { AuthContext } from './src/contexts/AuthContext';

LogBox.ignoreAllLogs(true);

function RootNavigation() {
  const { isLoggedIn } = useContext(AuthContext)!; 

  return (
      isLoggedIn ? <DrawerNavigator /> : <AppNavigator />
  );
}
function App() {
  useEffect(() => {
    (async () => {
      const permissionGranted = await requestAndroidNotificationPermission();
      if (permissionGranted) {
        await initializeNotificationService();
      }
    })();
  }, []);
  

  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
