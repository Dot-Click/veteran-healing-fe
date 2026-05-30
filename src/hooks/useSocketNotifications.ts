import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { io, Socket } from 'socket.io-client';

export function useSocketNotifications() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user?.id) {
      console.log('[SOCKET] No user, skipping connection');
      return;
    }

    // Connect to Socket.io server
    console.log('[SOCKET] Connecting as user:', user.id);
    const socket = io('http://localhost:3000', {
      auth: {
        userId: user.id,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('[SOCKET] ✅ Connected:', socket.id);
    });

    socket.on('notification', (notification: any) => {
      console.log('[SOCKET] 📬 Received notification:', notification);
      // Invalidate both queries to refetch data and update UI
      qc.invalidateQueries({ queryKey: ['notifications'] });
      qc.invalidateQueries({ queryKey: ['unread-count'] });
      console.log('[SOCKET] Invalidated notifications and unread-count queries');
    });

    socket.on('disconnect', () => {
      console.log('[SOCKET] ⚠️ Disconnected');
    });

    socket.on('connect_error', (error: any) => {
      console.error('[SOCKET] ❌ Connection error:', error);
    });

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        console.log('[SOCKET] Cleaning up connection');
        socketRef.current.disconnect();
      }
    };
  }, [user?.id, qc]);

  return socketRef.current;
}
