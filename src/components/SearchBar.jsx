import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Keyboard,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;
  const inputRef = useRef(null);

  const toggleSearch = () => {
    if (visible) {
      // Hide animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
        setSearchText('');
        Keyboard.dismiss();
      });
    } else {
      // Show animation
      setVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start(() => inputRef.current?.focus());
    }
  };

  return (
    <View style={styles.header}>
      {/* Search Icon */}
      {!visible && (
        <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
          <Icon name='search-outline' color='white' size={28}/>
          
        </TouchableOpacity>
      )}

      {/* Animated Search Input */}
      {visible && (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{translateX: slideAnim}],
            },
          ]}>
          <TextInput
            ref={inputRef}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleSearch} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    color: '#000',
  },
  closeButton: {
    paddingHorizontal: 6,
  },
  closeText: {
    fontSize: 20,
    color: '#444',
    fontWeight: '600',
  },
});
