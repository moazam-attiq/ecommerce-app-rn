import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import PdfViewer from '../screens/PdfViewer.jsx';
import DrawerTwo from '../screens/DrawerTwo';
import DrawerThree from '../screens/DrawerThree';
import LandingPage from '../screens/LandingPage';
import BottomNavigator from './BottomNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
          width: 250,
          borderRightWidth: 0.5,
          borderRightColor: '#444',
        },
        drawerActiveTintColor: 'rgba(0, 80, 121, 1)',
        drawerInactiveTintColor: '#aaa',
        drawerActiveBackgroundColor: 'rgba(140, 168, 188, 0.15)',
        drawerLabelStyle: {
          fontFamily: 'System',
          fontWeight: '500',
          letterSpacing: 0.5,
        },
      }}>
      <Drawer.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          title: 'Products Section',
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="PDF Viewer"
        component={PdfViewer}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="BottomNavigator" component={BottomNavigator} options={{
          drawerIcon: ({color, size}) => (
            <Icon name="cube-outline" color={color} size={size} />
          ),
        }}/>
      <Drawer.Screen name="Drawer Two" component={DrawerTwo} options={{
          drawerIcon: ({color, size}) => (
            <Icon name="notifications-outline" color={color} size={size} />
          ),
        }}/>
      <Drawer.Screen name="Drawer Three" component={DrawerThree} options={{
          drawerIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}/>
    </Drawer.Navigator>
  );
}
