/**
 * LibraryScreen
 * Display all songs in the library with search and filter
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
}

type SortOption = 'title' | 'artist' | 'album' | 'duration';

const LibraryScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  // Mock data - will be replaced with real data from file system
  const mockSongs: Song[] = [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
    { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
    { id: '3', title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 183 },
    { id: '4', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
    { id: '5', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: 301 },
    { id: '6', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: 294 },
    { id: '7', title: 'Sweet Child O Mine', artist: "Guns N' Roses", album: 'Appetite for Destruction', duration: 356 },
    { id: '8', title: 'Come Together', artist: 'The Beatles', album: 'Abbey Road', duration: 259 },
  ];

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter and sort songs
  const filteredAndSortedSongs = useMemo(() => {
    let filtered = mockSongs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort songs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'album':
          return a.album.localeCompare(b.album);
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  const renderSongItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={[
        styles.songItem,
        { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
      ]}
      activeOpacity={0.7}
    >
      {/* Album Art Placeholder */}
      <View style={styles.albumArt}>
        <Text style={styles.albumArtIcon}>🎵</Text>
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
          {item.title}
        </Text>
        <Text
          style={[
            styles.songArtist,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}
          numberOfLines={1}
        >
          {item.artist} • {item.album}
        </Text>
      </View>

      {/* Duration */}
      <Text
        style={[
          styles.duration,
          { color: isDarkMode ? COLORS.textTertiary : COLORS.textLight }
        ]}
      >
        {formatDuration(item.duration)}
      </Text>

      {/* More Options */}
      <TouchableOpacity style={styles.moreButton}>
        <Text style={[styles.moreIcon, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
          ⋮
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SortButton = ({ option, label }: { option: SortOption; label: string }) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        sortBy === option && styles.sortButtonActive,
        { backgroundColor: sortBy === option ? COLORS.primary : (isDarkMode ? COLORS.cardDark : COLORS.cardLight) }
      ]}
      onPress={() => setSortBy(option)}
    >
      <Text
        style={[
          styles.sortButtonText,
          { color: sortBy === option ? '#FFFFFF' : (isDarkMode ? COLORS.textSecondary : COLORS.textLight) }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
          Library
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
          {filteredAndSortedSongs.length} song{filteredAndSortedSongs.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
            ]}
            placeholder="Search songs, artists, albums..."
            placeholderTextColor={isDarkMode ? COLORS.textTertiary : COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={[styles.sortLabel, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
          Sort by:
        </Text>
        <View style={styles.sortButtons}>
          <SortButton option="title" label="Title" />
          <SortButton option="artist" label="Artist" />
          <SortButton option="album" label="Album" />
          <SortButton option="duration" label="Duration" />
        </View>
      </View>

      {/* Song List */}
      {filteredAndSortedSongs.length > 0 ? (
        <FlatList
          data={filteredAndSortedSongs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎵</Text>
          <Text style={[styles.emptyText, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
            {searchQuery ? 'No songs found' : 'No songs in library'}
          </Text>
          <Text style={[styles.emptySubtext, { color: isDarkMode ? COLORS.textTertiary : COLORS.textLight }]}>
            {searchQuery ? 'Try a different search term' : 'Add music files to get started'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
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
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    paddingVertical: SPACING.xs,
  },
  clearIcon: {
    fontSize: 18,
    color: COLORS.textTertiary,
    padding: SPACING.xs,
  },
  sortContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sortLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: SPACING.sm,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  sortButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  sortButtonActive: {
    // Active state handled by backgroundColor in component
  },
  sortButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  albumArtIcon: {
    fontSize: 24,
  },
  songInfo: {
    flex: 1,
    marginRight: SPACING.sm,
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
  duration: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    marginRight: SPACING.sm,
  },
  moreButton: {
    padding: SPACING.xs,
  },
  moreIcon: {
    fontSize: 20,
    fontWeight: FONT_WEIGHTS.bold,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
  },
});

export default LibraryScreen;