import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

export default function BottomThree() {
  return (
    <View>
      <Header title="Bottom Page Three" showDrawer={true} />
      <Text> BottomThree </Text>
    </View>
  );
}
