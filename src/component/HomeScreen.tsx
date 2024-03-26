import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Loading from './Atoms/Loading';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type HomeProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('MapScreen' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/location-symbol-with-landscape-background.jpg')}
      style={styles.background}>
      {isLoading ? <Loading /> : <View style={styles.container} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
});

export default Home;
