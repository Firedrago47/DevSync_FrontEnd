// import { useEffect, useState, useRef, useCallback } from 'react';

// // Mock Socket.IO types for development
// interface MockSocket {
//   id: string;
//   connected: boolean;
//   emit: (event: string, data?: any) => void;
//   on: (event: string, callback: (data?: any) => void) => void;
//   off: (event: string, callback?: (data?: any) => void) => void;
//   disconnect: () => void;
//   connect: () => void;
// }

// interface UseSocketReturn {
//   socket: MockSocket | null;
//   isConnected: boolean;
//   connectionError: string | null;
//   reconnectAttempts: number;
// }

// interface SocketEvent {
//   event: string;
//   callback: (data?: any) => void;
// }

// // Mock socket implementation for development
// class MockSocketClient implements MockSocket {
//   public id: string;
//   public connected: boolean;
//   private events: Map<string, ((data?: any) => void)[]>;
//   private connectionCallbacks: ((connected: boolean) => void)[];

//   constructor() {
//     this.id = `mock_socket_${Math.random().toString(36).substr(2, 9)}`;
//     this.connected = false;
//     this.events = new Map();
//     this.connectionCallbacks = [];
    
//     // Simulate connection after a delay
//     setTimeout(() => {
//       this.connected = true;
//       this.connectionCallbacks.forEach(callback => callback(true));
//       console.log('🔌 Mock Socket connected:', this.id);
//     }, 1000);
//   }

//   emit(event: string, data?: any) {
//     console.log('📤 Socket emit:', event, data);
    
//     // Simulate some responses for common events
//     setTimeout(() => {
//       switch (event) {
//         case 'join-project':
//           this.trigger('project-joined', { projectId: data?.projectId });
//           break;
//         case 'join-file':
//           this.trigger('file-joined', { projectId: data?.projectId, fileName: data?.fileName });
//           break;
//         case 'cursor-position':
//           // Echo back to simulate other users' cursors
//           this.trigger('cursor-position', {
//             ...data,
//             userId: 'other_user_123',
//             userName: 'Jane Doe'
//           });
//           break;
//         case 'file-update':
//           this.trigger('file-updated', {
//             ...data,
//             userId: 'other_user_123'
//           });
//           break;
//         case 'user-typing':
//           this.trigger('user-typing', {
//             userId: 'other_user_123',
//             isTyping: data?.isTyping || false
//           });
//           break;
//       }
//     }, 100 + Math.random() * 200); // Simulate network delay
//   }

//   on(event: string, callback: (data?: any) => void) {
//     if (!this.events.has(event)) {
//       this.events.set(event, []);
//     }
//     this.events.get(event)!.push(callback);
    
//     // Special handling for connection events
//     if (event === 'connect') {
//       this.connectionCallbacks.push(() => callback());
//       if (this.connected) {
//         callback();
//       }
//     }
//   }

//   off(event: string, callback?: (data?: any) => void) {
//     if (!this.events.has(event)) return;
    
//     if (callback) {
//       const callbacks = this.events.get(event)!;
//       const index = callbacks.indexOf(callback);
//       if (index > -1) {
//         callbacks.splice(index, 1);
//       }
//     } else {
//       this.events.delete(event);
//     }
//   }

//   disconnect() {
//     this.connected = false;
//     this.connectionCallbacks.forEach(callback => callback(false));
//     this.trigger('disconnect');
//     console.log('🔌 Mock Socket disconnected');
//   }

//   connect() {
//     if (!this.connected) {
//       setTimeout(() => {
//         this.connected = true;
//         this.connectionCallbacks.forEach(callback => callback(true));
//         this.trigger('connect');
//         console.log('🔌 Mock Socket reconnected');
//       }, 500);
//     }
//   }

//   private trigger(event: string, data?: any) {
//     const callbacks = this.events.get(event);
//     if (callbacks) {
//       callbacks.forEach(callback => {
//         try {
//           callback(data);
//         } catch (error) {
//           console.error('Socket event callback error:', error);
//         }
//       });
//     }
//   }
// }

// // Environment check
// const isDevelopment = process.env.NODE_ENV === 'development';
// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

// export const useSocket = (): UseSocketReturn => {
//   const [socket, setSocket] = useState<MockSocket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [connectionError, setConnectionError] = useState<string | null>(null);
//   const [reconnectAttempts, setReconnectAttempts] = useState(0);
//   const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
//   const maxReconnectAttempts = 5;

//   const connectSocket = useCallback(() => {
//     try {
//       // In development, use mock socket
//       if (isDevelopment || !SOCKET_URL.startsWith('http')) {
//         console.log('🚀 Using mock socket for development');
//         const mockSocket = new MockSocketClient();
//         setSocket(mockSocket);
        
//         // Simulate connection status changes
//         const handleConnection = (connected: boolean) => {
//           setIsConnected(connected);
//           if (connected) {
//             setConnectionError(null);
//             setReconnectAttempts(0);
//           }
//         };
        
//         mockSocket.on('connect', () => handleConnection(true));
//         mockSocket.on('disconnect', () => handleConnection(false));
        
//         return;
//       }

//       // In production, you would use real Socket.IO client here
//       // import { io } from 'socket.io-client';
//       // const realSocket = io(SOCKET_URL, {
//       //   transports: ['websocket', 'polling'],
//       //   timeout: 5000,
//       // });
//       // setSocket(realSocket);
      
//     } catch (error) {
//       console.error('Socket connection error:', error);
//       setConnectionError(error instanceof Error ? error.message : 'Connection failed');
      
//       // Attempt reconnection
//       if (reconnectAttempts < maxReconnectAttempts) {
//         const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 10000);
//         reconnectTimeoutRef.current = setTimeout(() => {
//           setReconnectAttempts(prev => prev + 1);
//           connectSocket();
//         }, delay);
//       }
//     }
//   }, [reconnectAttempts]);

//   useEffect(() => {
//     connectSocket();

//     return () => {
//       if (reconnectTimeoutRef.current) {
//         clearTimeout(reconnectTimeoutRef.current);
//       }
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, [connectSocket]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       socket?.disconnect();
//     };
//   }, [socket]);

//   return {
//     socket,
//     isConnected,
//     connectionError,
//     reconnectAttempts
//   };
// };

// // Hook for managing socket events with automatic cleanup
// export const useSocketEvent = (
//   event: string, 
//   callback: (data?: any) => void, 
//   dependencies: any[] = []
// ) => {
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.on(event, callback);

//     return () => {
//       socket.off(event, callback);
//     };
//   }, [socket, event, ...dependencies]);
// };

// // Hook for emitting socket events
// export const useSocketEmit = () => {
//   const { socket, isConnected } = useSocket();

//   const emit = useCallback((event: string, data?: any) => {
//     if (socket && isConnected) {
//       socket.emit(event, data);
//       return true;
//     }
//     console.warn('Socket not connected, cannot emit:', event);
//     return false;
//   }, [socket, isConnected]);

//   return { emit, isConnected };
// };

// export default useSocket;