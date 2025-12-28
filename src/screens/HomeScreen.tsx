/**
 * HomeScreen
 * Modern dashboard with dark theme and glass morphism
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { usePlayer, Song } from '../context/PlayerContext';

interface QuickAction {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  screen: 'Library' | 'Playlists' | 'Player';
}

type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Playlists: undefined;
  Player: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { playSong } = usePlayer();

  const recentSongs: Song[] = [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
    { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
    { id: '3', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
  ];

  const handlePlaySong = (song: Song) => {
    playSong(song, recentSongs);
    navigation.navigate('Player');
  };

  const quickActions: QuickAction[] = [
    { id: 1, icon: '🎵', title: 'Library', subtitle: 'Browse all songs', screen: 'Library' },
    { id: 2, icon: '📚', title: 'Playlists', subtitle: 'Your collections', screen: 'Playlists' },
    { id: 3, icon: '▶', title: 'Now Playing', subtitle: 'Current track', screen: 'Player' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.headerTitle}>Music</Text>
        </View>

        {/* Quick Access Grid */}
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Text style={styles.quickIcon}>{action.icon}</Text>
              <Text style={styles.quickTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recently Played Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recentSongs.map((song) => (
              <TouchableOpacity
                key={song.id}
                style={styles.songCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Player')}
              >
                <View style={styles.songArtwork}>
                  <Text style={styles.songArtworkIcon}>🎵</Text>
                </View>
                <Text style={styles.songTitle} numberOfLines={1}>
                  {song.title}
                </Text>
                <Text style={styles.songArtist} numberOfLines={1}>
                  {song.artist}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Library')}
          >
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Songs</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => navigation.navigate('Playlists')}
          >
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Artists</Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 160, // Space for mini player + tab bar
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  quickCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: COLORS.glassBackground,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  quickIcon: {
    fontSize: 36,
    marginBottom: SPACING.xs,
  },
  quickTitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  horizontalScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  songCard: {
    width: 140,
  },
  songArtwork: {
    width: 140,
    height: 140,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.glassBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  songArtworkIcon: {
    fontSize: 48,
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
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.glassBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
});

export default HomeScreen;