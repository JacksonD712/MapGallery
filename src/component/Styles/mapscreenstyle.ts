import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FF3C3C',
    padding: 10,
    borderRadius: 5,
  },
  buttonG: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#FF3C3C',
    padding: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0087D1',
    zIndex: -1,
  },
});

export default styles;
