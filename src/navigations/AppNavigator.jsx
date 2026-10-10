import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from '../screens/Signup.jsx';
import Login from '../screens/Login.jsx';
import ForgetPassword from '../screens/ForgetPassword.jsx';
import ReviewScreen from '../screens/ReviewScreen.jsx';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="Reviews" component={ReviewScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
