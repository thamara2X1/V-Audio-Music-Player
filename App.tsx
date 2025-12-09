/**
 * Music Player App
 * A React Native app for playing local music files
 * 
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: isDarkMode ? '#FFFFFF' : '#000000'}]}>
            🎵 Music Player
          </Text>
          <Text style={[styles.subtitle, {color: isDarkMode ? '#B3B3B3' : '#666666'}]}>
            Your Personal Music Library
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.placeholderBox}>
            <Text style={[styles.placeholderText, {color: isDarkMode ? '#808080' : '#999999'}]}>
              Library
            </Text>
          </View>
          <View style={styles.placeholderBox}>
            <Text style={[styles.placeholderText, {color: isDarkMode ? '#808080' : '#999999'}]}>
              Playlists
            </Text>
          </View>
          <View style={styles.placeholderBox}>
            <Text style={[styles.placeholderText, {color: isDarkMode ? '#808080' : '#999999'}]}>
              Now Playing
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: isDarkMode ? '#666666' : '#AAAAAA'}]}>
            Yet to build...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  placeholderBox: {
    height: 100,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default App;