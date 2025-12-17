/**
 * HomeScreen
 * Main dashboard with recently played and quick access
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

interface Song {
  id: number;
  title: string;
  artist: string;
}

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
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp>();

  // Mock data - will be replaced with real data later
  const recentSongs: Song[] = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
    { id: 3, title: 'Hotel California', artist: 'Eagles' },
  ];

  const quickActions: QuickAction[] = [
    { id: 1, icon: '🎵', title: 'Library', subtitle: 'Browse all songs', screen: 'Library' },
    { id: 2, icon: '📝', title: 'Playlists', subtitle: 'Your collections', screen: 'Playlists' },
    { id: 3, icon: '❤️', title: 'Now Playing', subtitle: 'Current track', screen: 'Player' },
  ];

  const handleQuickAction = (screen: 'Library' | 'Playlists' | 'Player') => {
    navigation.navigate(screen);
  };

  const handlePlaySong = (song: Song) => {
    // Will be implemented with PlayerContext later
    console.log('Playing song:', song.title);
    navigation.navigate('Player');
  };

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[
          styles.headerTitle, 
          { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
        ]}>
          🎵 Music Player
        </Text>
        <Text style={[
          styles.headerSubtitle, 
          { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
        ]}>
          Welcome back!
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle, 
          { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
        ]}>
          Quick Access
        </Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionCard,
              { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
            ]}
            activeOpacity={0.7}
            onPress={() => handleQuickAction(action.screen)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <View style={styles.actionText}>
              <Text style={[
                styles.actionTitle,
                { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
              ]}>
                {action.title}
              </Text>
              <Text style={[
                styles.actionSubtitle,
                { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
              ]}>
                {action.subtitle}
              </Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recently Played */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
          ]}>
            Recently Played
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Library')}>
            <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        {recentSongs.map((song) => (
          <TouchableOpacity
            key={song.id}
            style={[
              styles.songCard,
              { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
            ]}
            activeOpacity={0.7}
            onPress={() => handlePlaySong(song)}
          >
            <View style={styles.songAlbumArt}>
              <Text style={styles.albumArtPlaceholder}>🎵</Text>
            </View>
            <View style={styles.songInfo}>
              <Text style={[
                styles.songTitle,
                { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
              ]}>
                {song.title}
              </Text>
              <Text style={[
                styles.songArtist,
                { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
              ]}>
                {song.artist}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => handlePlaySong(song)}
            >
              <Text style={styles.playIcon}>▶️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Card */}
      <View style={[
        styles.statsCard,
        { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
      ]}>
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('Library')}
        >
          <Text style={styles.statNumber}>8</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Songs
          </Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('Playlists')}
        >
          <Text style={styles.statNumber}>0</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Playlists
          </Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Artists
          </Text>
        </View>
      </View>

      {/* Quick Tip */}
      <View style={[
        styles.tipCard,
        { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
      ]}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipContent}>
          <Text style={[
            styles.tipTitle,
            { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
          ]}>
            Quick Tip
          </Text>
          <Text style={[
            styles.tipText,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Tap on any song to start playing, or explore your library to discover more music!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
  },
  actionArrow: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  songAlbumArt: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  albumArtPlaceholder: {
    fontSize: 24,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
  },
  playButton: {
    padding: SPACING.sm,
  },
  playIcon: {
    fontSize: 20,
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  tipCard: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  tipIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
  },
  tipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: 20,
  },
});

export default HomeScreen;