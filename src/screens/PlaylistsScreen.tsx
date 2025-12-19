/**
 * PlaylistsScreen
 * Create and manage playlists
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  useColorScheme,
  Alert,
} from 'react-native';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

interface Playlist {
  id: string;
  name: string;
  songCount: number;
  duration: number; // total duration in seconds
  createdAt: number;
  artwork?: string;
}

const PlaylistsScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Favorites',
      songCount: 12,
      duration: 2880,
      createdAt: Date.now() - 86400000 * 7,
    },
    {
      id: '2',
      name: 'Road Trip',
      songCount: 8,
      duration: 1920,
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: '3',
      name: 'Workout Mix',
      songCount: 15,
      duration: 3600,
      createdAt: Date.now() - 86400000,
    },
  ]);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  // Format duration from seconds to hours and minutes
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Format date to relative time
  const formatDate = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / 86400000);
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() === '') {
      Alert.alert('Error', 'Please enter a playlist name');
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName.trim(),
      songCount: 0,
      duration: 0,
      createdAt: Date.now(),
    };

    setPlaylists([newPlaylist, ...playlists]);
    setNewPlaylistName('');
    setIsCreateModalVisible(false);
    Alert.alert('Success', `Playlist "${newPlaylist.name}" created!`);
  };

  const handleDeletePlaylist = (playlist: Playlist) => {
    Alert.alert(
      'Delete Playlist',
      `Are you sure you want to delete "${playlist.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPlaylists(playlists.filter(p => p.id !== playlist.id));
          },
        },
      ]
    );
  };

  const handlePlaylistPress = (playlist: Playlist) => {
    // Will navigate to playlist detail screen later
    Alert.alert(playlist.name, `${playlist.songCount} songs • ${formatDuration(playlist.duration)}`);
  };

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity
      style={[
        styles.playlistCard,
        { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.cardLight }
      ]}
      activeOpacity={0.7}
      onPress={() => handlePlaylistPress(item)}
    >
      {/* Playlist Artwork */}
      <View style={styles.playlistArtwork}>
        <Text style={styles.playlistArtworkIcon}>📝</Text>
      </View>

      {/* Playlist Info */}
      <View style={styles.playlistInfo}>
        <Text
          style={[
            styles.playlistName,
            { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.playlistMeta,
            { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }
          ]}
          numberOfLines={1}
        >
          {item.songCount} song{item.songCount !== 1 ? 's' : ''} • {formatDuration(item.duration)}
        </Text>
        <Text
          style={[
            styles.playlistDate,
            { color: isDarkMode ? COLORS.textTertiary : COLORS.textLight }
          ]}
        >
          {formatDate(item.createdAt)}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.playlistActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handlePlaylistPress(item)}
        >
          <Text style={styles.actionIcon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeletePlaylist(item)}
        >
          <Text style={[styles.actionIcon, { fontSize: 20 }]}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={[styles.emptyText, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
        No playlists yet
      </Text>
      <Text style={[styles.emptySubtext, { color: isDarkMode ? COLORS.textTertiary : COLORS.textLight }]}>
        Create your first playlist to organize your music
      </Text>
      <TouchableOpacity
        style={[styles.emptyButton, { backgroundColor: COLORS.primary }]}
        onPress={() => setIsCreateModalVisible(true)}
      >
        <Text style={styles.emptyButtonText}>Create Playlist</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
            Playlists
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
            {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: COLORS.primary }]}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <Text style={styles.createButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Playlists List */}
      {playlists.length > 0 ? (
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}

      {/* Create Playlist Modal */}
      <Modal
        visible={isCreateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? COLORS.cardDark : COLORS.backgroundLight }
          ]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? COLORS.textPrimary : COLORS.textDark }]}>
              Create New Playlist
            </Text>
            
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.cardLight,
                  color: isDarkMode ? COLORS.textPrimary : COLORS.textDark,
                  borderColor: isDarkMode ? COLORS.border : COLORS.borderLight,
                }
              ]}
              placeholder="Playlist name"
              placeholderTextColor={isDarkMode ? COLORS.textTertiary : COLORS.textLight}
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              autoFocus
              maxLength={30}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonCancel,
                  { backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.cardLight }
                ]}
                onPress={() => {
                  setNewPlaylistName('');
                  setIsCreateModalVisible(false);
                }}
              >
                <Text style={[styles.modalButtonText, { color: isDarkMode ? COLORS.textSecondary : COLORS.textLight }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonCreate,
                  { backgroundColor: COLORS.primary }
                ]}
                onPress={handleCreatePlaylist}
              >
                <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: FONT_WEIGHTS.bold,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  playlistArtwork: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  playlistArtworkIcon: {
    fontSize: 36,
  },
  playlistInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  playlistName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: 4,
  },
  playlistMeta: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    marginBottom: 2,
  },
  playlistDate: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
  },
  playlistActions: {
    gap: SPACING.xs,
  },
  actionButton: {
    padding: SPACING.xs,
  },
  actionIcon: {
    fontSize: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  emptyText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  emptyButton: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  modalInput: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  modalButtonCancel: {
    // Styles applied inline
  },
  modalButtonCreate: {
    // Styles applied inline
  },
  modalButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default PlaylistsScreen;