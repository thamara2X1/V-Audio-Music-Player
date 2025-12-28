/**
 * MiniPlayer Component
 * Compact player shown at bottom of screens
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import COLORS from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { usePlayer } from '../../context/PlayerContext';

type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Playlists: undefined;
  Player: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

const MiniPlayer: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { state, togglePlayPause, next } = usePlayer();
  const { currentSong, isPlaying, currentTime, duration } = state;

  // Don't show mini player if no song is playing
  if (!currentSong) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePress = () => {
    navigation.navigate('Player');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Album Art */}
        <View style={styles.albumArt}>
          <Text style={styles.albumArtIcon}>🎵</Text>
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.songArtist} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            <Text style={styles.controlIcon}>
              {isPlaying ? '⏸' : '▶'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <Text style={styles.controlIcon}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Above bottom tab bar
    left: 0,
    right: 0,
    backgroundColor: COLORS.glassBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.glassBorder,
    overflow: 'hidden',
  },
  progressBar: {
    height: 2,
    backgroundColor: COLORS.progressBar,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  albumArt: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  albumArtIcon: {
    fontSize: 22,
  },
  songInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  songTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  controlButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
});

export default MiniPlayer;