import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  RefreshControl,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler'; // Import Swipeable
import axios from 'axios';
import styles from '../component/Styles/DisplayScreenStyle';

interface ImageData {
  id: string;
  image: string;
  location: string;
}

const Display = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [, setSwipedItemId] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<ImageData[]>(
        'https://65fef466b2a18489b386cd90.mockapi.io/api/v1/image',
      );
      const reversedImages = response.data.reverse();
      setImages(reversedImages);
      setFilteredImages(reversedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFilter = () => {
    const filtered = images.filter(
      item =>
        item.location &&
        item.location.toLowerCase().indexOf(searchLocation.toLowerCase()) !==
          -1,
    );
    setFilteredImages(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://65fef466b2a18489b386cd90.mockapi.io/api/v1/image/${id}`,
      );
      fetchData();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
        },
      ],
      {cancelable: true},
    );
  };

  const renderImageItem = ({item}: {item: ImageData}) => (
    <Swipeable
      renderRightActions={() => (
        <View>
          <Text>Swipe to Delete</Text>
        </View>
      )}
      onSwipeableRightOpen={() => confirmDelete(item.id)}
      onSwipeableClose={() => setSwipedItemId('')}
      overshootRight={false}
      overshootFriction={8}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Image Options',
            'What would you like to do?',
            [
              {
                text: 'See Location',
                onPress: () => Alert.alert('Location', item.location),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        }}>
        <View style={styles.itemContainer}>
          {typeof item.image === 'string' ? (
            <Image
              source={{uri: `file://${item.image}`}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{uri: item.image.uri}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  const renderRow = ({item}: {item: ImageData[]}) => (
    <View style={styles.rowContainer}>
      {item.map(image => (
        <View key={image.id} style={styles.imageContainer}>
          {renderImageItem({item: image})}
        </View>
      ))}
    </View>
  );

  const chunkedImages = filteredImages.reduce(
    (resultArray: ImageData[][], item, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    },
    [],
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search location..."
        placeholderTextColor="white" 
        onChangeText={text => setSearchLocation(text)}
        value={searchLocation}
      />
      <TouchableOpacity onPress={handleFilter} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={chunkedImages}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Display;
