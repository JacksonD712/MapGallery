import React from 'react';
import {StyleSheet, Pressable, Text, Animated} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  targetScreen: string;
};

const Button: React.FC<Props> = ({navigation, targetScreen}) => {
  const scale = new Animated.Value(1);

  const animatePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate(targetScreen));
  };

  return (
    <Pressable onPress={animatePress}>
      <Animated.View style={[styles.button, {transform: [{scale}]}]}>
        <Text style={styles.text}>Go to {targetScreen}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF3C3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
