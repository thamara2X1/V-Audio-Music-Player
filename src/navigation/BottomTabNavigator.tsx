/**
 * Bottom Tab Navigator
 * Modern minimalist navigation with icons only
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme, Text, View } from 'react-native';
import COLORS from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';
import MiniPlayer from '../components/Player/MiniPlayer';
import { usePlayer } from '../context/PlayerContext';

export type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Playlists: undefined;
  Player: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { state } = usePlayer();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.backgroundDark,
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
            position: 'absolute',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarShowLabel: false, // Hide labels for minimalist design
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="♫" color={color} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="⚙" color={color} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Playlists"
          component={PlaylistsScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="⏱" color={color} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="♡" color={color} focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
      
      {/* Show MiniPlayer only when not on Player screen and song is playing */}
      {state.currentSong && <MiniPlayer />}
    </View>
  );
};

// Modern icon component with scaling effect and color support
const TabIcon: React.FC<{ icon: string; color: string; focused: boolean }> = ({ icon, color, focused }) => {
  return (
    <Text 
      style={{ 
        fontSize: focused ? 26 : 24, 
        color: color,
        opacity: focused ? 1 : 0.7,
        fontWeight: focused ? '600' : '400',
      }}
    >
      {icon}
    </Text>
  );
};

export default BottomTabNavigator;