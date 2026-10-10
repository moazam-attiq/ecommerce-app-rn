import React, {forwardRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../contexts/ThemeContext.jsx';

const InputBox = forwardRef(
  (
    {
      title,
      placeholder,
      value,
      onChangeText,
      autoCapitalize,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      hasBorder = false,
      hasRightIcon = false,
      rightIconPress,
      rightIconPath,
      isPassword = false,
    },
    ref,
  ) => {
    const {theme} = useTheme();
    const [rightIconVisible, setRightIconVisible] = useState(true);
    const [visible, setVisible] = useState(false); // 👈 for password visibility toggle
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      setRightIconVisible(hasRightIcon);
    }, []);

    const handleChangeText = text => {
      if (isFocused) {
        onChangeText?.(text);
      }
    };

    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.inputText, {color: theme.label}]}>{title}</Text>
        <View style={styles.inputBox}>
          <TextInput
            ref={ref}
            style={[
              styles.inputField,
              {borderBottomColor: isFocused ? theme.primary : theme.inputBorder, color: theme.text, backgroundColor: isFocused ? theme.bg : theme.disabledBg},
              hasBorder ? {borderWidth: 1} : {borderBottomWidth: 0.5},
            ]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={isPassword ? '* * * * * * * * *' : placeholder}
            placeholderTextColor={theme.label}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            autoFocus={false}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={isPassword && !visible} // 👈 toggle secure text entry
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={isFocused}
          />

          {/* 👇 Password Eye Toggle OR Custom Right Icon */}
          {isPassword ? (
            <TouchableOpacity
              style={[
                styles.visibleBox,
                {backgroundColor: theme.bg, borderColor: theme.inputBorder},
              ]}
              onPress={() => setVisible(!visible)}>
              <Icon
                name={visible ? 'eye' : 'eye-off'}
                color={theme.text}
                size={18}
              />
            </TouchableOpacity>
          ) : (
            rightIconVisible && (
              <TouchableOpacity
                style={[
                  styles.visibleBox,
                  {backgroundColor: theme.bg, borderColor: theme.inputBorder},
                ]}
                onPress={rightIconPress}>
                <Image
                  style={[styles.visibleIcon, {tintColor: theme.text}]}
                  source={rightIconPath}
                />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginTop: 35,
    paddingBottom: 8,
  },
  inputBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  inputField: {
    marginTop: 8,
    width: '100%',
    fontSize: 14,
    letterSpacing: 2,
  },
  visibleBox: {
    height: 27,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 0.5,
    position: 'absolute',
    right: 8,
    top: 13,
  },
  visibleIcon: {
    height: 20,
    width: 20,
  },
});

export default InputBox;
