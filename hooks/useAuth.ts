// import { useState, useEffect, useCallback, createContext, useContext } from 'react';

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   avatar?: string;
//   role: 'user' | 'admin';
//   createdAt: Date;
//   lastLoginAt: Date;
//   preferences: {
//     theme: 'dark' | 'light';
//     fontSize: number;
//     notifications: boolean;
//   };
//   token?: string;
// }
// // 
// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// interface UseAuthReturn extends AuthState {
//   login: (email: string, password: string) => Promise<boolean>;
//   register: (email: string, password: string, name: string) => Promise<boolean>;
//   logout: () => void;
//   updateProfile: (updates: Partial<User>) => Promise<boolean>;
//   resetPassword: (email: string) => Promise<boolean>;
//   refreshToken: () => Promise<boolean>;
// }

// // Mock user data for development
// const mockUsers: User[] = [
//   {
//     id: 'user_1',
//     email: 'john@example.com',
//     name: 'John Doe',
//     avatar: undefined,
//     role: 'user',
//     createdAt: new Date('2024-01-01'),
//     lastLoginAt: new Date(),
//     preferences: {
//       theme: 'dark',
//       fontSize: 14,
//       notifications: true,
//     },
//     token: 'mock_jwt_token_123'
//   },
//   {
//     id: 'user_2', 
//     email: 'jane@example.com',
//     name: 'Jane Smith',
//     avatar: undefined,
//     role: 'user',
//     createdAt: new Date('2024-01-15'),
//     lastLoginAt: new Date(),
//     preferences: {
//       theme: 'dark',
//       fontSize: 16,
//       notifications: false,
//     },
//     token: 'mock_jwt_token_456'
//   },
//   {
//     id: 'admin_1',
//     email: 'admin@example.com', 
//     name: 'Admin User',
//     avatar: undefined,
//     role: 'admin',
//     createdAt: new Date('2023-12-01'),
//     lastLoginAt: new Date(),
//     preferences: {
//       theme: 'dark',
//       fontSize: 14,
//       notifications: true,
//     },
//     token: 'mock_jwt_token_admin'
//   }
// ];

// // Storage keys
// const STORAGE_KEYS = {
//   USER: 'devsync_user',
//   TOKEN: 'devsync_token',
//   REFRESH_TOKEN: 'devsync_refresh_token',
// } as const;

// // Mock API delay
// const mockApiDelay = (min = 500, max = 1500) => 
//   new Promise(resolve => setTimeout(resolve, min + Math.random() * (max - min)));

// export const useAuth = (): UseAuthReturn => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//     loading: true,
//     error: null,
//   });

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
//         const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

//         if (storedUser && storedToken) {
//           const user = JSON.parse(storedUser);
          
//           // Simulate token validation
//           await mockApiDelay(200, 500);
          
//           // In production, you would validate the token with your backend
//           const isValidToken = storedToken.startsWith('mock_jwt_token');
          
//           if (isValidToken) {
//             setAuthState({
//               user: { ...user, token: storedToken },
//               isAuthenticated: true,
//               loading: false,
//               error: null,
//             });
//             console.log('🔐 User restored from localStorage:', user.email);
//           } else {
//             // Invalid token, clear storage
//             localStorage.removeItem(STORAGE_KEYS.USER);
//             localStorage.removeItem(STORAGE_KEYS.TOKEN);
//             setAuthState(prev => ({ ...prev, loading: false }));
//           }
//         } else {
//           setAuthState(prev => ({ ...prev, loading: false }));
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         setAuthState(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to initialize authentication'
//         }));
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Login function
//   const login = useCallback(async (email: string, password: string): Promise<boolean> => {
//     try {
//       setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
//       // Simulate API call
//       await mockApiDelay();
      
//       // Mock authentication logic
//       const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
//       if (!user) {
//         throw new Error('User not found');
//       }
      
//       // In mock mode, any password works except 'wrong'
//       if (password === 'wrong') {
//         throw new Error('Invalid password');
//       }
      
//       // Update last login
//       const authenticatedUser = {
//         ...user,
//         lastLoginAt: new Date(),
//       };
      
//       // Store in localStorage
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authenticatedUser));
//       localStorage.setItem(STORAGE_KEYS.TOKEN, user.token!);
      
//       setAuthState({
//         user: authenticatedUser,
//         isAuthenticated: true,
//         loading: false,
//         error: null,
//       });
      
//       console.log('🔐 User logged in:', email);
//       return true;
      
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Login failed';
//       setAuthState(prev => ({
//         ...prev,
//         loading: false,
//         error: errorMessage
//       }));
//       console.error('Login error:', errorMessage);
//       return false;
//     }
//   }, []);

//   // Register function
//   const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
//     try {
//       setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
//       // Simulate API call
//       await mockApiDelay();
      
//       // Check if user already exists
//       const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
//       if (existingUser) {
//         throw new Error('User already exists');
//       }
      
//       // Create new user
//       const newUser: User = {
//         id: `user_${Date.now()}`,
//         email: email.toLowerCase(),
//         name,
//         role: 'user',
//         createdAt: new Date(),
//         lastLoginAt: new Date(),
//         preferences: {
//           theme: 'dark',
//           fontSize: 14,
//           notifications: true,
//         },
//         token: `mock_jwt_token_${Date.now()}`
//       };
      
//       // Add to mock users (in production, this would be a real API call)
//       mockUsers.push(newUser);
      
//       // Store in localStorage
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
//       localStorage.setItem(STORAGE_KEYS.TOKEN, newUser.token);
      
//       setAuthState({
//         user: newUser,
//         isAuthenticated: true,
//         loading: false,
//         error: null,
//       });
      
//       console.log('🔐 User registered:', email);
//       return true;
      
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Registration failed';
//       setAuthState(prev => ({
//         ...prev,
//         loading: false,
//         error: errorMessage
//       }));
//       console.error('Registration error:', errorMessage);
//       return false;
//     }
//   }, []);

//   // Logout function
//   const logout = useCallback(() => {
//     // Clear localStorage
//     localStorage.removeItem(STORAGE_KEYS.USER);
//     localStorage.removeItem(STORAGE_KEYS.TOKEN);
//     localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    
//     setAuthState({
//       user: null,
//       isAuthenticated: false,
//       loading: false,
//       error: null,
//     });
    
//     console.log('🔐 User logged out');
//   }, []);

//   // Update profile function
//   const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
//     if (!authState.user) return false;
    
//     try {
//       setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
//       // Simulate API call
//       await mockApiDelay(300, 800);
      
//       const updatedUser = { ...authState.user, ...updates };
      
//       // Store in localStorage
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      
//       setAuthState(prev => ({
//         ...prev,
//         user: updatedUser,
//         loading: false,
//       }));
      
//       console.log('🔐 Profile updated:', updates);
//       return true;
      
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
//       setAuthState(prev => ({
//         ...prev,
//         loading: false,
//         error: errorMessage
//       }));
//       console.error('Profile update error:', errorMessage);
//       return false;
//     }
//   }, [authState.user]);

//   // Reset password function
//   const resetPassword = useCallback(async (email: string): Promise<boolean> => {
//     try {
//       setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
//       // Simulate API call
//       await mockApiDelay();
      
//       // Check if user exists
//       const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
//       if (!user) {
//         throw new Error('User not found');
//       }
      
//       setAuthState(prev => ({ ...prev, loading: false }));
      
//       console.log('🔐 Password reset email sent to:', email);
//       return true;
      
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
//       setAuthState(prev => ({
//         ...prev,
//         loading: false,
//         error: errorMessage
//       }));
//       console.error('Password reset error:', errorMessage);
//       return false;
//     }
//   }, []);

//   // Refresh token function
//   const refreshToken = useCallback(async (): Promise<boolean> => {
//     try {
//       const currentToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
//       if (!currentToken) return false;
      
//       // Simulate API call
//       await mockApiDelay(200, 400);
      
//       // In production, make actual API call to refresh token
//       const newToken = `mock_jwt_token_refreshed_${Date.now()}`;
//       localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
      
//       if (authState.user) {
//         setAuthState(prev => ({
//           ...prev,
//           user: prev.user ? { ...prev.user, token: newToken } : null
//         }));
//       }
      
//       console.log('🔐 Token refreshed');
//       return true;
      
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       logout(); // Force logout on refresh failure
//       return false;
//     }
//   }, [authState.user, logout]);

//   // Auto-refresh token periodically
//   useEffect(() => {
//     if (!authState.isAuthenticated) return;

//     const interval = setInterval(() => {
//       refreshToken();
//     }, 15 * 60 * 1000); // Refresh every 15 minutes

//     return () => clearInterval(interval);
//   }, [authState.isAuthenticated, refreshToken]);

//   return {
//     ...authState,
//     login,
//     register,
//     logout,
//     updateProfile,
//     resetPassword,
//     refreshToken,
//   };
// };

// // Auth Context for Provider pattern (optional)
// const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const auth = useAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };

// export default useAuth;