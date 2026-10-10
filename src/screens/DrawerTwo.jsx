import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

export default function DrawerTwo() {
  return (
    <View>
        <Header title='Drawer Page Two' showDrawer={true}/>
      <Text> DrawerTwo </Text>
    </View>
  );
}
