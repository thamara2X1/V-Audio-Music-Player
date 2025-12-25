/**
 * PlaylistsScreen
 * Modern playlist management with dark theme
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
  Alert,
} from 'react-native';
import COLORS from '../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

interface Playlist {
  id: string;
  name: string;
  songCount: number;
  duration: number;
  createdAt: number;
}

const PlaylistsScreen: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: '1', name: 'Favorites', songCount: 12, duration: 2880, createdAt: Date.now() - 86400000 * 7 },
    { id: '2', name: 'Road Trip', songCount: 8, duration: 1920, createdAt: Date.now() - 86400000 * 3 },
    { id: '3', name: 'Workout Mix', songCount: 15, duration: 3600, createdAt: Date.now() - 86400000 },
  ]);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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
  };

  const handleDeletePlaylist = (playlist: Playlist) => {
    Alert.alert(
      'Delete Playlist',
      `Delete "${playlist.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setPlaylists(playlists.filter(p => p.id !== playlist.id)),
        },
      ]
    );
  };

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity style={styles.playlistCard} activeOpacity={0.8}>
      <View style={styles.playlistArtwork}>
        <Text style={styles.playlistArtworkIcon}>📚</Text>
      </View>

      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.playlistMeta} numberOfLines={1}>
          {item.songCount} songs • {formatDuration(item.duration)}
        </Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePlaylist(item)}>
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Playlists</Text>
          <Text style={styles.headerSubtitle}>{playlists.length} playlists</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={() => setIsCreateModalVisible(true)}>
          <Text style={styles.createButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Playlists List */}
      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Modal */}
      <Modal visible={isCreateModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Playlist</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Playlist name"
              placeholderTextColor={COLORS.textTertiary}
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              autoFocus
              maxLength={30}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setNewPlaylistName('');
                  setIsCreateModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCreate]} onPress={handleCreatePlaylist}>
                <Text style={styles.modalButtonText}>Create</Text>
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
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonIcon: {
    fontSize: 28,
    color: COLORS.backgroundDark,
    fontWeight: FONT_WEIGHTS.bold,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.glassBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  playlistArtwork: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(30, 215, 96, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  playlistArtworkIcon: {
    fontSize: 32,
  },
  playlistInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  playlistName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  playlistMeta: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  deleteIcon: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.backgroundDarker,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  modalInput: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.glassBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
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
    backgroundColor: COLORS.glassBackground,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  modalButtonCreate: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.backgroundDark,
  },
  modalButtonTextCancel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textSecondary,
  },
});

export default PlaylistsScreen;