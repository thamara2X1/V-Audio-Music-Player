/**
 * AudioService
 * Wrapper for react-native-track-player with simplified API
 */

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  Track,
} from 'react-native-track-player';
import { Song } from '../context/PlayerContext';

class AudioService {
  private isSetup: boolean = false;

  /**
   * Initialize the audio player
   */
  async setup(): Promise<void> {
    if (this.isSetup) return;

    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10, // 10 MB
      });

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      this.isSetup = true;
      console.log('AudioService: Setup complete');
    } catch (error) {
      console.error('AudioService: Setup failed', error);
      throw error;
    }
  }

  /**
   * Convert Song to Track format
   */
  private songToTrack(song: Song): Track {
    return {
      id: song.id,
      url: song.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Demo URL
      title: song.title,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
      artwork: song.artwork,
    };
  }

  /**
   * Add songs to queue
   */
  async setQueue(songs: Song[]): Promise<void> {
    await this.setup();
    const tracks = songs.map(song => this.songToTrack(song));
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
  }

  /**
   * Add single song to queue
   */
  async addToQueue(song: Song): Promise<void> {
    await this.setup();
    const track = this.songToTrack(song);
    await TrackPlayer.add(track);
  }

  /**
   * Play
   */
  async play(): Promise<void> {
    await this.setup();
    await TrackPlayer.play();
  }

  /**
   * Pause
   */
  async pause(): Promise<void> {
    await this.setup();
    await TrackPlayer.pause();
  }

  /**
   * Stop
   */
  async stop(): Promise<void> {
    await this.setup();
    await TrackPlayer.stop();
  }

  /**
   * Skip to next track
   */
  async skipToNext(): Promise<void> {
    await this.setup();
    await TrackPlayer.skipToNext();
  }

  /**
   * Skip to previous track
   */
  async skipToPrevious(): Promise<void> {
    await this.setup();
    await TrackPlayer.skipToPrevious();
  }

  /**
   * Skip to specific track by index
   */
  async skipToTrack(index: number): Promise<void> {
    await this.setup();
    const queue = await TrackPlayer.getQueue();
    if (index >= 0 && index < queue.length) {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
  }

  /**
   * Seek to position (in seconds)
   */
  async seekTo(position: number): Promise<void> {
    await this.setup();
    await TrackPlayer.seekTo(position);
  }

  /**
   * Set volume (0-1)
   */
  async setVolume(volume: number): Promise<void> {
    await this.setup();
    await TrackPlayer.setVolume(Math.max(0, Math.min(1, volume)));
  }

  /**
   * Set repeat mode
   */
  async setRepeatMode(mode: 'off' | 'one' | 'all'): Promise<void> {
    await this.setup();
    let repeatMode: RepeatMode;
    switch (mode) {
      case 'one':
        repeatMode = RepeatMode.Track;
        break;
      case 'all':
        repeatMode = RepeatMode.Queue;
        break;
      default:
        repeatMode = RepeatMode.Off;
    }
    await TrackPlayer.setRepeatMode(repeatMode);
  }

  /**
   * Get current position (in seconds)
   */
  async getPosition(): Promise<number> {
    await this.setup();
    return await TrackPlayer.getPosition();
  }

  /**
   * Get current duration (in seconds)
   */
  async getDuration(): Promise<number> {
    await this.setup();
    return await TrackPlayer.getDuration();
  }

  /**
   * Get current track
   */
  async getCurrentTrack(): Promise<Track | null> {
    await this.setup();
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if (currentTrackIndex === null) return null;
    const queue = await TrackPlayer.getQueue();
    return queue[currentTrackIndex] || null;
  }

  /**
   * Get playback state
   */
  async getState(): Promise<State> {
    await this.setup();
    return await TrackPlayer.getState();
  }

  /**
   * Check if playing
   */
  async isPlaying(): Promise<boolean> {
    const state = await this.getState();
    return state === State.Playing;
  }

  /**
   * Get queue
   */
  async getQueue(): Promise<Track[]> {
    await this.setup();
    return await TrackPlayer.getQueue();
  }

  /**
   * Clear queue
   */
  async reset(): Promise<void> {
    await this.setup();
    await TrackPlayer.reset();
  }

  /**
   * Remove track from queue
   */
  async removeTrack(index: number): Promise<void> {
    await this.setup();
    await TrackPlayer.remove(index);
  }
}

// Export singleton instance
export default new AudioService();