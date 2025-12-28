/**
 * LibraryScreen
 * Modern library view with search and filters
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { usePlayer, Song } from '../context/PlayerContext';

interface LibrarySong {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

type SortOption = 'title' | 'artist' | 'album' | 'duration';

type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Playlists: undefined;
  Player: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootTabParamList>;

const LibraryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { playSong } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  const mockSongs: LibrarySong[] = [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 354 },
    { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482 },
    { id: '3', title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 183 },
    { id: '4', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391 },
    { id: '5', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: 301 },
    { id: '6', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: 294 },
    { id: '7', title: 'Sweet Child O Mine', artist: "Guns N' Roses", album: 'Appetite for Destruction', duration: 356 },
    { id: '8', title: 'Come Together', artist: 'The Beatles', album: 'Abbey Road', duration: 259 },
  ];

  const handlePlaySong = (song: LibrarySong, index: number) => {
    // Convert to Song type and play
    const songToPlay: Song = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
    };
    const queue: Song[] = filteredAndSortedSongs.map(s => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      album: s.album,
      duration: s.duration,
    }));
    playSong(songToPlay, queue);
    navigation.navigate('Player');
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredAndSortedSongs = useMemo(() => {
    let filtered = mockSongs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title': return a.title.localeCompare(b.title);
        case 'artist': return a.artist.localeCompare(b.artist);
        case 'album': return a.album.localeCompare(b.album);
        case 'duration': return a.duration - b.duration;
        default: return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  const renderSongItem = ({ item, index }: { item: LibrarySong; index: number }) => (
    <TouchableOpacity 
      style={styles.songItem} 
      activeOpacity={0.7}
      onPress={() => handlePlaySong(item, index)}
    >
      <View style={styles.albumArt}>
        <Text style={styles.albumArtIcon}>🎵</Text>
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>

      <Text style={styles.duration}>{formatDuration(item.duration)}</Text>

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreIcon}>⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SortButton = ({ option, label }: { option: SortOption; label: string }) => (
    <TouchableOpacity
      style={[styles.sortChip, sortBy === option && styles.sortChipActive]}
      onPress={() => setSortBy(option)}
    >
      <Text style={[styles.sortChipText, sortBy === option && styles.sortChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <Text style={styles.headerSubtitle}>{filteredAndSortedSongs.length} songs</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artists..."
            placeholderTextColor={COLORS.textTertiary}
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

      {/* Sort Chips */}
      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortScroll}>
          <SortButton option="title" label="Title" />
          <SortButton option="artist" label="Artist" />
          <SortButton option="album" label="Album" />
          <SortButton option="duration" label="Duration" />
        </ScrollView>
      </View>

      {/* Song List */}
      <FlatList
        data={filteredAndSortedSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.glassBackground,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.xs,
  },
  clearIcon: {
    fontSize: 16,
    color: COLORS.textTertiary,
    padding: SPACING.xs,
  },
  sortContainer: {
    marginBottom: SPACING.md,
  },
  sortScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  sortChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.glassBackground,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  sortChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortChipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  sortChipTextActive: {
    color: COLORS.backgroundDark,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 160, // Space for mini player + tab bar
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.glassBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
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
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  duration: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginRight: SPACING.sm,
  },
  moreButton: {
    padding: SPACING.xs,
  },
  moreIcon: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
});

export default LibraryScreen;