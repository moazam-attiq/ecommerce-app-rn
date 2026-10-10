import React, {useState, useRef, useContext} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InputBox from '../components/InputBox.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import AppButton from '../components/AppButton.jsx';
import PhoneNumberInputBox from '../components/PhoneNumberInputBox.jsx';
import BottomText from '../components/BottomText.jsx';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {AuthContext} from '../contexts/AuthContext.jsx';
import {useTheme} from '../contexts/ThemeContext.jsx';
import {BlurView} from '@react-native-community/blur'; // 👈 added import
import {useToast} from 'react-native-toast-notifications';

function Signup() {
  const Toast = useToast();
  const {setUserData} = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const moveToLogin = () => {
    if (!email || !password || !confirmPassword || !name || !phoneNumber) {
      Toast.show('Input Fields Missing', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
      
      return;
    }
    if (password !== confirmPassword) {
      Toast.show('Both passwords do not match.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
      return;
    }

    setUserData({name, email, phone: phoneNumber, password});
    Toast.show('Successfully Signed Up.', {
      type: 'success',
      placement: 'top',
      duration: 3000,
      animationType: 'slide-in',
      offset: 30,
    });
    navigation.navigate('Login');
  };

  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        Toast.show('Please grant storage permission from app settings.', {
          type: 'warning',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
          offset: 30,
        });
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleSelectFromGallery = async () => {
    setModalVisible(false);
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
      }
    } catch (error) {
      Toast.show('Failed to select image.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
    }
  };

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const hasStoragePermission = await requestStoragePermission();
    const hasCameraPermission = await requestCameraPermission();

    if (!hasStoragePermission || !hasCameraPermission) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      saveToPhotos: true,
    };

    try {
      const result = await launchCamera(options);
      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
      }
    } catch (error) {
      Toast.show('Failed to take photo.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Signup</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerScroll}
        style={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}>
        <View style={styles.dpContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                imageUri ? {uri: imageUri} : require('../images/defaultDp.png')
              }
              style={{
                width: 110,
                height: 110,
                marginTop: 3,
                borderRadius: 60,
              }}
            />
          </TouchableOpacity>
        </View>


        <InputBox
          title={'Full Name'}
          placeholder={'Moazam Attiq'}
          onChangeText={setName}
          value={name}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <InputBox
          ref={emailRef}
          title={'Email'}
          placeholder={'abc123@gmail.com'}
          onChangeText={setEmail}
          value={email}
          keyboardType={'email-address'}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <PhoneNumberInputBox setPhoneNumber={setPhoneNumber} />
        
        <InputBox
          ref={passwordRef}
          isPassword={true}
          title={'New Password'}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <InputBox
          ref={confirmPasswordRef}
          isPassword={true}
          title={'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          returnKeyType="done"
        />

        <AppButton displayText={'Sign Up'} onPress={moveToLogin} />
        <BottomText
          displayText={'Already have an account?'}
          clickedText={'Sign In'}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
      {/* 🔹 Modal with BlurView only */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType={theme.bg === 'black' ? 'dark' : 'light'}
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
          />
      
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an option</Text>
      
            <TouchableOpacity
              style={[styles.modalButton, styles.glassButton]}
              onPress={handleTakePhoto}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
      
            <TouchableOpacity
              style={[styles.modalButton, styles.glassButton]}
              onPress={handleSelectFromGallery}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
      
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.cancelButton,
                styles.glassCancel,
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'black',
    },
    dpContainer: {
      backgroundColor: theme.bg,
      width: 120,
      height: 120,
      borderRadius: 75,
      marginTop: 20,
      borderColor: theme.label,
      borderWidth: 2.5,
    },
    headingText: {
      fontSize: 30,
      marginTop: 40,
      color: theme.buttonText,
      letterSpacing: 2,
      textTransform: 'uppercase',
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
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    blurBackground: {
      width: '100%',
      borderTopLeftRadius: 50,
      overflow: 'hidden',
    },
    modalContent: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderTopLeftRadius: 50,
      padding: 20,
      paddingBottom: 40,
      width: '100%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.text,
    },
    modalButton: {
      backgroundColor: theme.buttonBg,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
      width: '100%',
      minHeight: 55,
    },
    modalButtonText: {
      color: theme.buttonText,
      fontSize: 17,
      fontWeight: '600',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    cancelButton: {
      backgroundColor: theme.bg,
      marginTop: 10,
      borderColor: theme.text,
      borderWidth: 0.5,
    },
    cancelButtonText: {
      color: theme.text,
    },
  });

export default Signup;
