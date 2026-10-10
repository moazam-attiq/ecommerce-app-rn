import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

import {useTheme} from '../contexts/ThemeContext.jsx';
import {AuthContext} from '../contexts/AuthContext.jsx';
import {useNavigation} from '@react-navigation/native';
import InputBox from '../components/InputBox.jsx';
import AppButton from '../components/AppButton.jsx';
import BottomText from '../components/BottomText.jsx';
import ToggleTheme from '../components/ToggleTheme.jsx';

function Login() {
  const {currentUser, login} = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Toast = useToast();

  const passwordRef = useRef();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const continueLogin = () => {
    console.log('Login button pressed');

    if (!email || !password) {
      Toast.show('Please fill in all fields', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
      return;
    }

    if (password !== currentUser?.password || email !== currentUser?.email) {
      Toast.show('Email or Password is incorrect', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
    }

    // API Logic
    console.log('Email:', email);
    console.log('Password:', password);
    Keyboard.dismiss();

    login();
  };

  const moveToSignup = () => {
    console.log('Moved to Signup Page');
    navigation.navigate('Signup');
  };

  const moveToForgotPassword = () => {
    console.log('Moved to Forgot Password Page');
    navigation.navigate('ForgetPassword');
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
          style={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
          keyboardDismissMode="on-drag">
          <View style={styles.headerContainer}>
            <View style={styles.toggleContainer}>
              <ToggleTheme />
            </View>
            <Text style={styles.headingText}>Login</Text>
          </View>

          <InputBox
            title={'Email'}
            placeholder={'abc123@gmail.com'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <InputBox
            ref={passwordRef}
            title={'Password'}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            isPassword={true}
          />

          <AppButton displayText={'Login'} onPress={continueLogin} />

          <BottomText
            onPress={moveToSignup}
            displayText="Don't have an account?"
            clickedText="Sign Up"
          />

          <BottomText
            onPress={moveToForgotPassword}
            displayText="Forgot your password?"
            clickedText="Reset Password"
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
      width: 70,
      height: 70,
      backgroundColor: theme.cardBg || theme.bg,
      borderTopRightRadius: 2,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 65,
      marginBottom: 20,
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
    headerContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      position: 'relative',
    },

    headingText: {
      fontSize: 28,
      color: theme.text,
      letterSpacing: 2,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    toggleContainer: {
      position: 'absolute',
      top: -15,
      right: 20,
    },
  });

export default Login;
