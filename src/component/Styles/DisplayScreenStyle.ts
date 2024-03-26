import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0087D1',
  },
  itemContainer: {
    margin: 10,

    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 20,
  },

  searchInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    marginTop: 60,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#FF3C3C',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default styles;
