import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ToggleTheme = () => {
  const { mode, theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleTheme}
        android_ripple={{ color: theme.text }}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.buttonText}>
            {mode === 'light' ? '🌑' : '☀️'}
        </Text>
      </Pressable>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    button: {
      backgroundColor: theme.buttonBg,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 30,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  });

export default ToggleTheme;
