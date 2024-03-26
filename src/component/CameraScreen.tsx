import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  Linking,
  Button,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from '../component/Styles/CameraScreenStyle';

const CameraS = () => {
  const {requestPermission, hasPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [locationName, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (route.params && route.params.location) {
      setSelectedLocation(route.params.location);
    }
  }, [route.params]);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }
    openCamera();
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setCapturedImage(photo?.path);
    closeCamera();
  };

  const saveImage = async () => {
    try {
      // First, save the image to your API
      const responseAPI = await fetch(
        'https://65fef466b2a18489b386cd90.mockapi.io/api/v1/image',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: capturedImage,
            location: locationName,
          }),
        },
      );
      if (!responseAPI.ok) {
        throw new Error('Failed to save image to API');
      }
      await CameraRoll.saveAsset(capturedImage);

      Alert.alert('Success', 'Photo saved successfully', [
        {style: 'cancel', text: 'ok'},
      ]);
    } catch (error) {
      console.error('Error saving image:', error.message);
      Alert.alert('Error', 'Failed to save photo. Please try again later.');
    }
  };

  const pickImageFromGallery = async () => {
    launchImageLibrary({}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setCapturedImage(selectedImage.uri);

          try {
            const formData = new FormData();
            formData.append('image', {
              uri: selectedImage.uri,
            });
            formData.append('location', locationName);

            const responseAPI = await fetch(
              'https://65fef466b2a18489b386cd90.mockapi.io/api/v1/image',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  image: selectedImage,
                  location: locationName,
                }),
              },
            );
            if (!responseAPI.ok) {
              throw new Error('Failed to save image to API');
            }

            Alert.alert('Success', 'Photo saved successfully', [
              {style: 'cancel', text: 'ok'},
            ]);
          } catch (error) {
            console.error('Error saving image:', error.message);
            Alert.alert(
              'Error',
              'Failed to save photo. Please try again later.',
            );
          }
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  if (device === null) {
    return (
      <View style={styles.mainView}>
        <Text style={{fontSize: 20, color: 'red'}}>
          Camera feature not supported
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <Pressable
        onPress={() => navigation.navigate('Display' as never)}
        style={styles.button}>
        <Text style={styles.buttonText}>Go to Gallery</Text>
      </Pressable>
      <Pressable onPress={pickImageFromGallery} style={styles.button}>
        <Text style={styles.buttonText}>Import From Gallery</Text>
      </Pressable>
      {capturedImage ? (
        <>
          <Pressable onPress={saveImage} style={styles.button}>
            <Text style={styles.buttonText}>Save to Gallery</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleCameraPermission} style={styles.button}>
          <Text style={styles.buttonText}>
            {hasPermission ? 'Open camera' : 'Request camera access'}
          </Text>
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <Camera
            photo
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />

          <View style={styles.cameraActions}>
            <Pressable onPress={takePhoto} style={styles.buttoncamera}>
              <Text style={styles.buttonTextCamera}>Take photo</Text>
            </Pressable>

            <Button title="Close" color="black" onPress={closeCamera} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CameraS;
