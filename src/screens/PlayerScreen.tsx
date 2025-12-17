/**
 * PlayerScreen
 * Full-screen music player with controls
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

const PlayerScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(245); // 4:05 in seconds
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock current song
  const currentSong: Song = {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
  };

  // Mock queue
  const queue: Song[] = [
    currentSong,
    { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
    { id: '3', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
  ];

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate playback progress (will be replaced with actual audio service)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    console.log('Previous track');
  };

  const handleNext = () => {
    setCurrentTime(0);
    console.log('Next track');
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleRepeat = () => {
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return '🔂';
      case 'all':
        return '🔁';
      default:
        return '↻';
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={[styles.headerIcon, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            ⌄
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
          Now Playing
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={[styles.headerIcon, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            ⋮
          </Text>
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <View style={styles.albumArtContainer}>
        <View style={[
          styles.albumArt,
          { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
        ]}>
          <Text style={styles.albumArtIcon}>🎵</Text>
        </View>
      </View>

      {/* Song Info */}
      <View style={styles.songInfo}>
        <Text
          style={[
            styles.songTitle,
            { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
          ]}
          numberOfLines={1}
        >
          {currentSong.title}
        </Text>
        <Text
          style={[
            styles.songArtist,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}
          numberOfLines={1}
        >
          {currentSong.artist}
        </Text>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: COLORS.primary }
            ]}
          />
          <TouchableOpacity
            style={[
              styles.progressThumb,
              { left: `${progress}%`, backgroundColor: COLORS.primary }
            ]}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
            {formatTime(currentTime)}
          </Text>
          <Text style={[styles.timeText, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleShuffle}
        >
          <Text
            style={[
              styles.controlIcon,
              { color: isShuffle ? COLORS.primary : (isDarkMode ? COLORS.textSecondary : COLORS.textLight) }
            ]}
          >
            🔀
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePrevious}
        >
          <Text style={[styles.controlIcon, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            ⏮
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.playButton,
            { backgroundColor: COLORS.primary }
          ]}
          onPress={handlePlayPause}
        >
          <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleNext}
        >
          <Text style={[styles.controlIcon, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            ⏭
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleRepeat}
        >
          <Text
            style={[
              styles.controlIcon,
              { color: repeatMode !== 'off' ? COLORS.primary : (isDarkMode ? COLORS.textSecondary : COLORS.textLight) }
            ]}
          >
            {getRepeatIcon()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Queue Preview */}
      <View style={styles.queueSection}>
        <View style={styles.queueHeader}>
          <Text style={[styles.queueTitle, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            Up Next
          </Text>
          <Text style={[styles.queueCount, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
            {queue.length - 1} songs
          </Text>
        </View>
        {queue.slice(1, 4).map((song, index) => (
          <View
            key={song.id}
            style={[
              styles.queueItem,
              { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
            ]}
          >
            <View style={styles.queueItemAlbumArt}>
              <Text style={styles.queueItemIcon}>🎵</Text>
            </View>
            <View style={styles.queueItemInfo}>
              <Text
                style={[
                  styles.queueItemTitle,
                  { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
                ]}
                numberOfLines={1}
              >
                {song.title}
              </Text>
              <Text
                style={[
                  styles.queueItemArtist,
                  { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
                ]}
                numberOfLines={1}
              >
                {song.artist}
              </Text>
            </View>
            <Text style={[styles.queueItemDuration, { color: isDarkMode ? COLORS.textTertiary : COLORS.textLight }]}>
              {formatTime(song.duration)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerButton: {
    padding: SPACING.sm,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  albumArtContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  albumArt: {
    width: width - SPACING.xl * 2,
    height: width - SPACING.xl * 2,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumArtIcon: {
    fontSize: 120,
  },
  songInfo: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  songTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
  },
  favoriteButton: {
    alignSelf: 'center',
    marginTop: SPACING.md,
    padding: SPACING.sm,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.progressBar,
    borderRadius: BORDER_RADIUS.sm,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  timeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    gap: SPACING.lg,
  },
  controlButton: {
    padding: SPACING.md,
  },
  controlIcon: {
    fontSize: 28,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 32,
  },
  queueSection: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xxl,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  queueTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  queueCount: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  queueItemAlbumArt: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  queueItemIcon: {
    fontSize: 20,
  },
  queueItemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  queueItemTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: 2,
  },
  queueItemArtist: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
  },
  queueItemDuration: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
  },
});

export default PlayerScreen;