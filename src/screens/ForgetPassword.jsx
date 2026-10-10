import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../components/AppButton';
import InputBox from '../components/InputBox';
import BottomText from '../components/BottomText';
import {useTheme} from '../contexts/ThemeContext';
import { useToast } from 'react-native-toast-notifications';

function ForgetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const Toast = useToast();

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const moveToLogin = () => {
    if (!email) {
      Toast.show('Fill all the necessary Fields', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
      return;
    }
    Toast.show('n email containing the necessary steps has been sent to you.', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
    navigation.navigate('Login');
    console.log('Moved Back to Login Page');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}></View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerScroll}
          style={styles.contentContainer}>
          <Text style={styles.headingText}>Forget Password</Text>
          <InputBox
            title={'Email'}
            placeholder={'abc123@gmail.com'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <AppButton displayText={'Forget'} onPress={moveToLogin} />
          <BottomText
            displayText={'Go back to login? '}
            clickedText={'Sign In'}
            onPress={() => navigation.goBack()}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'black',
    },
    logoContainer: {
      width: 80,
      height: 80,
      backgroundColor: theme.bg,
      borderTopRightRadius: 2,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
    logo: {
      backgroundColor: theme.text,
      width: 40,
      height: 40,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      marginTop: 50,
      backgroundColor: theme.bg,
      borderTopLeftRadius: 60,
    },
    contentContainerScroll: {
      alignItems: 'center',
      paddingBottom: 40,
    },
    headingText: {
      fontSize: 30,
      marginTop: 40,
      color: theme.text,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
  });

export default ForgetPassword;
