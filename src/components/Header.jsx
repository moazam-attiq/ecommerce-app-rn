import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';
import {useToast} from 'react-native-toast-notifications';
import SearchBar from './SearchBar';

export default function Header({
  title = 'Home',
  showDrawer = false,
  showSearch = false,
}) {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const Toast = useToast();

  const moveToLogin = () => {
    Toast.show('Logged out successfully', {
      type: 'success',
      placement: 'top',
      duration: 3000,
      animationType: 'slide-in',
      offset: 30,
    });
    Keyboard.dismiss();
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.header, {backgroundColor: theme.buttonBg}]}>
      {/* Left Section (Logo or Drawer Icon) */}
      <View style={styles.leftSection}>
        {showDrawer ? (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={[styles.logoContainer, {backgroundColor: theme.bg}]}>
              <View style={[styles.logo, {backgroundColor: theme.text}]} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[styles.logoContainer, {backgroundColor: theme.bg}]}>
            <View style={[styles.logo, {backgroundColor: theme.text}]} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        {showSearch && <SearchBar />}
        <TouchableOpacity
          onPress={moveToLogin}
          style={[styles.logoutContainer, {backgroundColor: theme.buttonText}]}>
          <Text style={[styles.logoutText, {color: theme.buttonBg}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 87,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderBottomLeftRadius: 2,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flexShrink: 1,
    marginLeft: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 1,
    flexGrow: 1,
    maxWidth: '55%',
  },
  logoutContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 8,
  },
  logoutText: {
    fontWeight: '600',
  },
});
