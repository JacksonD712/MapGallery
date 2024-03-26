import React from 'react';
import {Pressable, Image} from 'react-native';
import styles from '../Styles/mapscreenstyle';

interface RefreshButtonProps {
  onPress: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Image
        source={require('../../assets/two.png')}
        style={{width: 50, height: 50}}
      />
    </Pressable>
  );
};

export default RefreshButton;
