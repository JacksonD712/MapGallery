import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../component/HomeScreen';
import CameraScreen from '../component/CameraScreen';
import MapScreen from '../component/MapScreen';
import DisplayImage from '../component/Display';

const MainNavigator = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
        screenOptions={{
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationConfig: {
            open: {
              animation: 'timing',
              config: {
                duration: 600,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 600,
              },
            },
          },
          headerTransparent: true,
          headerTitleStyle: {color: 'white'},
          headerTintColor: 'white',
        }}>
        <MainNavigator.Screen
          name="Home"
          component={Home}
          options={{title: 'Home'}}
        />
        <MainNavigator.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{title: 'Camera'}}
        />
        <MainNavigator.Screen
          name="MapScreen"
          component={MapScreen}
          options={{title: 'Map'}}
        />
        <MainNavigator.Screen
          name="Display"
          component={DisplayImage}
          options={{title: 'Display'}}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
