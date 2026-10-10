import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

export default function DrawerThree() {
  return (
    <View>
      <Header title="Drawer Page Three" showDrawer={true} />
      <Text> DrawerThree </Text>
    </View>
  );
}
