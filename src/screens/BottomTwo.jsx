import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

export default function BottomTwo() {
  return (
    <View>
      <Header title="Bottom Page Two" showDrawer={true} />
      <Text> BottomTwo </Text>
    </View>
  );
}
