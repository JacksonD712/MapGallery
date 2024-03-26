import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#0087D1',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: ({pressed}) => ({
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pressed ? '#001833' : '#FF3C3C',
    borderRadius: 8,
    transform: [{scale: pressed ? 1.2 : 1}],
    marginTop: 24,
  }),
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  cameraActions: {
    position: 'absolute',
    bottom: 100,
  },
  buttoncamera: {
    borderRadius: 100,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 100,
    width: 100,
  },
})
export default styles;
