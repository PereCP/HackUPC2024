import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainPage from './pages/MainPage';
import TripPage from './pages/TripPage';

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
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Details" component={TripPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
