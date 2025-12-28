/**
 * Music Player App
 * Entry point for the application
 * 
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { PlayerProvider } from './src/context/PlayerContext';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </PlayerProvider>
  );
};

export default App;