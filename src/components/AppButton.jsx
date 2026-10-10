import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

function AppButton({ displayText, onPress }) {
  const { theme } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.buttonDesign, { backgroundColor: theme.buttonBg }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          {displayText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 25,
    width: '70%',
  },
  buttonDesign: {
    padding: 12,
    borderRadius: 10,
    borderTopRightRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default AppButton;
