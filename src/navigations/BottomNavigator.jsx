import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

import BottomOne from '../screens/BottomOne';
import BottomTwo from '../screens/BottomTwo';
import BottomThree from '../screens/BottomThree';

const BottomTab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="BottomOne"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          backgroundColor: '#fff',
          elevation: 10,
          height: 65,
          borderRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === 'BottomOne') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'BottomTwo') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'BottomThree') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name={iconName} size={24} color={color} />
            </View>
          );
        },
      })}>
      <BottomTab.Screen
        name="BottomOne"
        component={BottomOne}
        options={{title: 'Home'}}
      />
      <BottomTab.Screen
        name="BottomTwo"
        component={BottomTwo}
        options={{title: 'Docs'}}
      />
      <BottomTab.Screen
        name="BottomThree"
        component={BottomThree}
        options={{title: 'Profile'}}
      />
    </BottomTab.Navigator>
  );
}
