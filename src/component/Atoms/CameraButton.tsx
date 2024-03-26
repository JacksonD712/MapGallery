import React from 'react';
import {Pressable, Image} from 'react-native';
import styles from '../Styles/mapscreenstyle';

interface CameraButtonProps {
  onPress: () => void;
}

const CameraButton: React.FC<CameraButtonProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonG}>
      <Image
        source={require('../../assets/one.png')}
        style={{width: 50, height: 50}}
      />
    </Pressable>
  );
};

export default CameraButton;
