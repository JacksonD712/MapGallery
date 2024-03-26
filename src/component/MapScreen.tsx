import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapEvent from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import styles from '../component/Styles/mapscreenstyle';
import RefreshButton from './Atoms/RefreshButton';
import CameraButton from './Atoms/CameraButton';

interface Location {
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [apiLocations, setApiLocations] = useState<any[]>([]);

  const fetchApiData = useCallback(async () => {
    try {
      const response = await fetch(
        'https://65fef466b2a18489b386cd90.mockapi.io/api/v1/image',
      );
      const data = await response.json();
      const geocodedLocations = await Promise.all(
        data.map(async (item: any) => {
          const coordinates = await fetchCoordinates(item.location);
          return {...item, coordinates};
        }),
      );
      setApiLocations(geocodedLocations);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
    fetchApiData();
  }, [fetchApiData]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      (error: {message: any}) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleDoublePress = async (event: MapEvent) => {
    const {coordinate} = event.nativeEvent;
    setCurrentLocation(coordinate);
    const locationName = await fetchLocationName(
      coordinate.latitude,
      coordinate.longitude,
    );
    if (locationName) {
      Alert.alert(
        'Take Photo',
        `Do you want to take a photo at ${locationName}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setCurrentLocation(coordinate);
              navigation.navigate('CameraScreen', {location: locationName});
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('Error', 'Failed to fetch location name.');
    }
  };

  const fetchLocationName = async (
    latitude: number,
    longitude: number,
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBfFbdCdeiPV7a51vsvV-lVBwLw5QTJZDs`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const name = data.results[0].formatted_address;
        return name;
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
    return null;
  };

  async function fetchCoordinates(location: string): Promise<Location | null> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location,
        )}&key=AIzaSyBfFbdCdeiPV7a51vsvV-lVBwLw5QTJZDs`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const {lat, lng} = data.results[0].geometry.location;
        return {latitude: lat, longitude: lng};
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
    return null;
  }

  const handleRefresh = () => {
    fetchApiData();
    getCurrentLocation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.latitude : 33.8547,
            longitude: currentLocation ? currentLocation.longitude : 35.8623,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          showUserLocation={true}
          onDoublePress={handleDoublePress}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
          {apiLocations.map(
            (item, index) =>
              item.coordinates && (
                <Marker
                  key={index}
                  coordinate={item.coordinates}
                  title={item.location || 'Unknown Location'}>
                  <View style={markerStyles.container}>
                    {typeof item.image === 'string' ? (
                      <Image
                        style={markerStyles.image}
                        source={{uri: `file://${item.image}`}}
                      />
                    ) : (
                      <Image
                        style={markerStyles.image}
                        source={{uri: item.image.uri}}
                      />
                    )}
                  </View>
                </Marker>
              ),
          )}
        </MapView>
      </View>
      <CameraButton
        onPress={() => navigation.navigate('CameraScreen' as never)}
      />
      <RefreshButton onPress={handleRefresh} />
      <View style={styles.content}>
        <Text>Choose location where you want to take an image</Text>
      </View>
    </View>
  );
};

const markerStyles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default MapScreen;
