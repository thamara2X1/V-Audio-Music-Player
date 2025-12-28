/**
 * PlayerContext
 * Global state management for music player
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Song interface
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork?: string;
  url?: string;
}

// Player state interface
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: Song[];
  currentIndex: number;
  repeatMode: 'off' | 'one' | 'all';
  shuffleMode: boolean;
  volume: number;
}

// Player actions interface
interface PlayerContextType {
  // State
  state: PlayerState;
  
  // Playback controls
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  stop: () => void;
  
  // Track navigation
  next: () => void;
  previous: () => void;
  skipToTrack: (index: number) => void;
  
  // Queue management
  setQueue: (songs: Song[], startIndex?: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  
  // Playback modes
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
  
  // Seeking
  seek: (position: number) => void;
  
  // Volume
  setVolume: (volume: number) => void;
  
  // Song selection
  playSong: (song: Song, queue?: Song[]) => void;
}

// Create context with default values
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Initial state
const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: -1,
  repeatMode: 'off',
  shuffleMode: false,
  volume: 1.0,
};

// Provider component
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>(initialState);

  // Simulate playback progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (state.isPlaying && state.currentSong && state.currentTime < state.duration) {
      interval = setInterval(() => {
        setState(prev => {
          const newTime = prev.currentTime + 1;
          
          // Handle end of track
          if (newTime >= prev.duration) {
            // Handle repeat modes
            if (prev.repeatMode === 'one') {
              return { ...prev, currentTime: 0 };
            } else if (prev.repeatMode === 'all' && prev.currentIndex === prev.queue.length - 1) {
              // Loop back to start
              return {
                ...prev,
                currentIndex: 0,
                currentSong: prev.queue[0],
                currentTime: 0,
                duration: prev.queue[0].duration,
              };
            } else if (prev.currentIndex < prev.queue.length - 1) {
              // Play next track
              const nextIndex = prev.currentIndex + 1;
              return {
                ...prev,
                currentIndex: nextIndex,
                currentSong: prev.queue[nextIndex],
                currentTime: 0,
                duration: prev.queue[nextIndex].duration,
              };
            } else {
              // End of queue
              return { ...prev, isPlaying: false, currentTime: 0 };
            }
          }
          
          return { ...prev, currentTime: newTime };
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isPlaying, state.currentTime, state.duration]);

  // Play
  const play = () => {
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  // Pause
  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  // Stop
  const stop = () => {
    setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  };

  // Next track
  const next = () => {
    setState(prev => {
      if (prev.currentIndex < prev.queue.length - 1) {
        const nextIndex = prev.currentIndex + 1;
        const nextSong = prev.queue[nextIndex];
        return {
          ...prev,
          currentIndex: nextIndex,
          currentSong: nextSong,
          currentTime: 0,
          duration: nextSong.duration,
          isPlaying: true,
        };
      } else if (prev.repeatMode === 'all') {
        // Loop back to start
        const firstSong = prev.queue[0];
        return {
          ...prev,
          currentIndex: 0,
          currentSong: firstSong,
          currentTime: 0,
          duration: firstSong.duration,
          isPlaying: true,
        };
      }
      return prev;
    });
  };

  // Previous track
  const previous = () => {
    setState(prev => {
      // If more than 3 seconds in, restart current track
      if (prev.currentTime > 3) {
        return { ...prev, currentTime: 0 };
      }
      
      // Otherwise go to previous track
      if (prev.currentIndex > 0) {
        const prevIndex = prev.currentIndex - 1;
        const prevSong = prev.queue[prevIndex];
        return {
          ...prev,
          currentIndex: prevIndex,
          currentSong: prevSong,
          currentTime: 0,
          duration: prevSong.duration,
          isPlaying: true,
        };
      }
      
      return { ...prev, currentTime: 0 };
    });
  };

  // Skip to specific track
  const skipToTrack = (index: number) => {
    setState(prev => {
      if (index >= 0 && index < prev.queue.length) {
        const song = prev.queue[index];
        return {
          ...prev,
          currentIndex: index,
          currentSong: song,
          currentTime: 0,
          duration: song.duration,
          isPlaying: true,
        };
      }
      return prev;
    });
  };

  // Set queue
  const setQueue = (songs: Song[], startIndex: number = 0) => {
    if (songs.length === 0) return;
    
    const song = songs[startIndex];
    setState(prev => ({
      ...prev,
      queue: songs,
      currentIndex: startIndex,
      currentSong: song,
      currentTime: 0,
      duration: song.duration,
      isPlaying: true,
    }));
  };

  // Add to queue
  const addToQueue = (song: Song) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, song],
    }));
  };

  // Remove from queue
  const removeFromQueue = (index: number) => {
    setState(prev => {
      const newQueue = prev.queue.filter((_, i) => i !== index);
      let newIndex = prev.currentIndex;
      
      // Adjust current index if needed
      if (index < prev.currentIndex) {
        newIndex = prev.currentIndex - 1;
      } else if (index === prev.currentIndex) {
        // If removing current song, play next
        if (newQueue.length > 0) {
          const nextSong = newQueue[Math.min(newIndex, newQueue.length - 1)];
          return {
            ...prev,
            queue: newQueue,
            currentIndex: Math.min(newIndex, newQueue.length - 1),
            currentSong: nextSong,
            currentTime: 0,
            duration: nextSong.duration,
          };
        } else {
          return {
            ...prev,
            queue: [],
            currentIndex: -1,
            currentSong: null,
            currentTime: 0,
            duration: 0,
            isPlaying: false,
          };
        }
      }
      
      return {
        ...prev,
        queue: newQueue,
        currentIndex: newIndex,
      };
    });
  };

  // Clear queue
  const clearQueue = () => {
    setState(prev => ({
      ...prev,
      queue: [],
      currentIndex: -1,
      currentSong: null,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    }));
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setState(prev => ({ ...prev, shuffleMode: !prev.shuffleMode }));
  };

  // Toggle repeat
  const toggleRepeat = () => {
    setState(prev => {
      const modes: Array<'off' | 'one' | 'all'> = ['off', 'all', 'one'];
      const currentModeIndex = modes.indexOf(prev.repeatMode);
      const newMode = modes[(currentModeIndex + 1) % modes.length];
      return { ...prev, repeatMode: newMode };
    });
  };

  // Set repeat mode
  const setRepeatMode = (mode: 'off' | 'one' | 'all') => {
    setState(prev => ({ ...prev, repeatMode: mode }));
  };

  // Seek
  const seek = (position: number) => {
    setState(prev => ({ ...prev, currentTime: Math.max(0, Math.min(position, prev.duration)) }));
  };

  // Set volume
  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  // Play a specific song
  const playSong = (song: Song, queue?: Song[]) => {
    if (queue) {
      const index = queue.findIndex(s => s.id === song.id);
      setQueue(queue, index >= 0 ? index : 0);
    } else {
      setState(prev => ({
        ...prev,
        currentSong: song,
        currentTime: 0,
        duration: song.duration,
        isPlaying: true,
        queue: [song],
        currentIndex: 0,
      }));
    }
  };

  const value: PlayerContextType = {
    state,
    play,
    pause,
    togglePlayPause,
    stop,
    next,
    previous,
    skipToTrack,
    setQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    toggleShuffle,
    toggleRepeat,
    setRepeatMode,
    seek,
    setVolume,
    playSong,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use player context
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export default PlayerContext;


