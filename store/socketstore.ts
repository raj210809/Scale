import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { useAppStore } from './store'

interface SocketStore {
  socket: Socket | null;
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,

  initializeSocket: (userId) => {
    if (get().socket) return; // Prevent multiple initializations

    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      query: { userId },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.warn('Socket disconnected');
    });

    // Handle received messages
    newSocket.on('receiveMessage', (message) => {
      const { selectedChatData, addMessages } = useAppStore.getState() as { selectedChatData: { _id: string }, addMessages: (message: any) => void };

      if (
        selectedChatData._id === message.sender ||
          selectedChatData._id === message.receiver
      ) {
        addMessages(message);
      }
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  
}));