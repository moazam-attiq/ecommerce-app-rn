import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

function BottomText({ displayText, clickedText, onPress }) {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[styles.bottomText, { color: theme.subText }]}>
        {displayText}{' '}
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.clickableText, { color: theme.text }]}>
            {clickedText}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 16,
    marginTop: 20,
  },
  clickableText: {
    marginLeft: 3,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default BottomText;
