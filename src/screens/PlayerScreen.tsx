/**
 * PlayerScreen
 * Modern full-screen music player with gradient background
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

const PlayerScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(354);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [isFavorite, setIsFavorite] = useState(false);

  const currentSong: Song = {
    id: '1',
    title: 'Why Not',
    artist: 'Youngstunners',
    album: 'Recovery',
    duration: 354,
  };

  const queue: Song[] = [
    currentSong,
    { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
    { id: '3', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
  ];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentTime, duration]);

  const progress = (currentTime / duration) * 100;

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientTop, { backgroundColor: '#2A4A5E' }]} />
        <View style={[styles.gradientBottom, { backgroundColor: COLORS.backgroundDark }]} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>⌄</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerSubtitle}>Now playing</Text>
            <Text style={styles.headerTitle}>Playlist "Playlist of the day"</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Album Art - Large and centered */}
        <View style={styles.albumArtContainer}>
          <View style={styles.albumArt}>
            <Text style={styles.albumArtIcon}>🎵</Text>
            <Text style={styles.albumLabel}>RECOVERY</Text>
          </View>
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <View style={styles.songTitleRow}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.songArtist} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]}>
              <View style={styles.progressDot} />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Main Controls */}
        <View style={styles.mainControls}>
          <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
            <Text style={[styles.controlIcon, isShuffle && styles.activeControl]}>⤮</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setCurrentTime(0)}>
            <Text style={styles.controlIconLarge}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCurrentTime(0)}>
            <Text style={styles.controlIconLarge}>⏭</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            const modes: Array<'off' | 'one' | 'all'> = ['off', 'all', 'one'];
            setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
          }}>
            <Text style={[styles.controlIcon, repeatMode !== 'off' && styles.activeControl]}>
              {repeatMode === 'one' ? '🔂' : repeatMode === 'all' ? '🔁' : '↻'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomIcon}>🎵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomIcon}>⚙</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomIcon}>⏱</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.bottomIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
  },
  gradientTop: {
    height: '50%',
    opacity: 0.6,
  },
  gradientBottom: {
    height: '50%',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  albumArtContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginTop: SPACING.lg,
  },
  albumArt: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.glassBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  albumArtIcon: {
    fontSize: 100,
    marginBottom: SPACING.md,
  },
  albumLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 2,
  },
  songInfo: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  songTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  songTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  favoriteIcon: {
    fontSize: 28,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
  },
  songArtist: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.progressBar,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    position: 'relative',
  },
  progressDot: {
    position: 'absolute',
    right: -6,
    top: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  timeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xxl,
    gap: SPACING.xl,
  },
  controlIcon: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  controlIconLarge: {
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  activeControl: {
    color: COLORS.primary,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 28,
    color: COLORS.backgroundDark,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.xxl,
    marginTop: SPACING.xxl,
  },
  bottomButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIcon: {
    fontSize: 22,
    color: COLORS.textSecondary,
  },
});

export default PlayerScreen;