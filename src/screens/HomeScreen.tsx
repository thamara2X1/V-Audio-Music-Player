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
}

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // Mock data - will be replaced with real data later
  const recentSongs: Song[] = [
    { id: 1, title: 'Song Title 1', artist: 'Artist Name' },
    { id: 2, title: 'Song Title 2', artist: 'Artist Name' },
    { id: 3, title: 'Song Title 3', artist: 'Artist Name' },
  ];

  const quickActions: QuickAction[] = [
    { id: 1, icon: '🎵', title: 'Library', subtitle: 'Browse all songs' },
    { id: 2, icon: '📝', title: 'Playlists', subtitle: 'Your collections' },
    { id: 3, icon: '❤️', title: 'Favorites', subtitle: 'Liked songs' },
  ];

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
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
        ]}>
          Recently Played
        </Text>
        {recentSongs.map((song) => (
          <TouchableOpacity
            key={song.id}
            style={[
              styles.songCard,
              { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
            ]}
            activeOpacity={0.7}
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
            <TouchableOpacity style={styles.playButton}>
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
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Songs
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Playlists
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}>
            Artists
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
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.md,
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
});

export default HomeScreen;