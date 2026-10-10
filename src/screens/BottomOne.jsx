import React from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'

export default function BottomOne () {
    return (
      <View>
        <Header title='Bottom Page One' showDrawer={true}/>
        <Text> BottomOne </Text>
      </View>
    )
  }
