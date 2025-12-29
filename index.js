/**
 * @format
 */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { name as appName } from './app.json';
import playbackService from './src/services/playbackService';

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Register the playback service
TrackPlayer.registerPlaybackService(() => playbackService);