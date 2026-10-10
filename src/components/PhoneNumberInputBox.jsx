import React, {useRef} from 'react';
import IntlPhoneInput from 'react-native-intl-phone-input';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {useTheme} from '../contexts/ThemeContext.jsx';

export default function PhoneNumberInputBox({setPhoneNumber}) {
  const phoneInput = useRef(null);
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const handlePhoneNumberChange = ({dialCode, unmaskedPhoneNumber}) => {
    unmaskedPhoneNumber = unmaskedPhoneNumber.slice(1);
    const fullNumber = `${dialCode}${unmaskedPhoneNumber}`;
    if (setPhoneNumber) setPhoneNumber(fullNumber);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.inputLabel}>Phone Number</Text>

      <View style={styles.container}>
        <IntlPhoneInput
          ref={phoneInput}
          defaultCountry="PK"
          disableCountryChange={true}
          onChangeText={handlePhoneNumberChange}
          placeholder="0300-3030300"
          placeholderTextColor={theme.label}
          containerStyle={styles.phoneInputContainer}
          flagStyle={styles.flagStyle}
          dialCodeTextStyle={styles.dialCodeTextStyle}
          phoneInputStyle={styles.phoneTextInput}
          modalCountryItemCountryNameStyle={styles.countryNameStyle}
          modalCountryItemCountryDialCodeStyle={styles.countryDialStyle}
        />
      </View>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    wrapper: {
      width: '80%',
      marginTop: 35,
      paddingBottom: 8,
      alignSelf: 'center',
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.label,
      letterSpacing: 2,
      marginLeft: 10,
      textTransform: 'uppercase',
      marginBottom: 8,
    },

    container: {
      width: '100%',
      marginTop: 10,
    },

    phoneInputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.bg,
      borderBottomWidth: 0.6,
      borderBottomColor: theme.inputBorder,
      borderRadius: 8,
      paddingVertical: Platform.OS === 'ios' ? 10 : 6,
      paddingHorizontal: 8,
    },

    flagStyle: {
      width: 35,
      height: 35,
      marginRight: 8,
      marginBottom: 8,
    },

    dialCodeTextStyle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '500',
      marginRight: 6,
    },

    phoneTextInput: {
      flex: 1,
      color: theme.text,
      fontSize: 16,
      paddingVertical: Platform.OS === 'ios' ? 4 : 0,
    },

    countryNameStyle: {
      color: theme.text,
    },

    countryDialStyle: {
      color: theme.label,
    },
  });
