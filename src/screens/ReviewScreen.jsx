import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import InputBox from '../components/InputBox';
import AppButton from '../components/AppButton';
import { useToast } from 'react-native-toast-notifications';

export default function ReviewScreen() {
  const navigation = useNavigation();
  const [review, setReview] = useState('');
  const Toast = useToast();
  const postReview = () => {
    Toast.show('Review submitted', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
    navigation.navigate('LandingPage');
  };
  return (
    <View>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.headingText }>Reviews</Text>
        <InputBox
          title={'Give us a Review'}
          placeholder={'Enter your review here'}
          autoCapitalize={'none'}
          keyboardType={'default'}
          value={review}
          onChangeText={setReview}
        />
        
        <AppButton 
        displayText={'Submit'}
        onPress={postReview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 50,
    },
    headingText: {
        fontSize: 24,
        color: 'black',
        letterSpacing: 2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
});
