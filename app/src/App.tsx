import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainPage from './pages/MainPage';
import TripPage from './pages/TripPage';
import GlobeMap from './pages/GlobeMap';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://i.imgur.com/TmzyRhO.png' }}
                style={{ width: 130, height: 40 }} // Adjust size as needed
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#003097', // Your custom color here
            },
            headerTintColor: '#fff', // Color of the header text/icons
          }}
        />
        <Stack.Screen name="Details" component={TripPage} options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://i.imgur.com/TmzyRhO.png' }}
                style={{ width: 130, height: 40 }} // Adjust size as needed
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#003097', // Your custom color here
            },
            headerTintColor: '#fff', // Color of the header text/icons
          }} />
        <Stack.Screen name="Globe" component={GlobeMap} options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://i.imgur.com/TmzyRhO.png' }}
                style={{ width: 130, height: 40 }} // Adjust size as needed
                resizeMode="contain"
              />
            ),
            headerStyle: {
              backgroundColor: '#003097', // Your custom color here
            },
            headerTintColor: '#fff', // Color of the header text/icons
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
