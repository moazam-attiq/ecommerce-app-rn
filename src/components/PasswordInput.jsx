import React, { useState, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const PasswordInput = forwardRef(({ title, value, onChangeText, onSubmitEditing, returnKeyType }, ref) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputText, { color: theme.label }]}>{title}</Text>
      <View style={styles.inputBox}>
        <TextInput
          ref={ref}
          style={[styles.inputField, { borderBottomColor: theme.inputBorder, color: theme.text }]}
          placeholder="* * * * * * * * *"
          placeholderTextColor={theme.label}
          secureTextEntry={!visible}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
        <TouchableOpacity
          style={[styles.visibleBox, { backgroundColor: theme.bg, borderColor: theme.inputBorder }]}
          onPress={() => setVisible(!visible)}>
          <Image
            style={[styles.visibleIcon, { tintColor: theme.text }]}
            source={visible ? require('../images/visible.png') : require('../images/invisible.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
    borderBottomWidth: 0.5,
    marginTop: 8,
    width: '100%',
    fontSize: 14,
    letterSpacing: 2,
  },
  visibleBox: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginLeft: -30,
    borderRadius: 16,
    borderWidth: 0.5,
  },
  visibleIcon: {
    height: 20,
    width: 20,
  },
});

export default PasswordInput;
