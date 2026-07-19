'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User, AuthResponse } from '@/types';
import { authApi } from '@/lib/auth-api';

interface PreferencesPayload {
  interests: string[];
  budgetRange: string;
  travelStyle: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (payload: PreferencesPayload) => Promise<User>; // 💡 টাইপ void থেকে User এ চেঞ্জ করা হয়েছে
  isMutating: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'MapMinds_token';
const USER_KEY = 'MapMinds_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const persistAuth = (data: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
    queryClient.setQueryData(['currentUser'], data.user);
  };

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: persistAuth,
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authApi.register(name, email, password),
    onSuccess: persistAuth,
  });

  const demoLoginMutation = useMutation({
    mutationFn: authApi.demoLogin,
    onSuccess: persistAuth,
  });

  const googleLoginMutation = useMutation({
    mutationFn: (credential: string) => authApi.googleLogin(credential),
    onSuccess: persistAuth,
    onError: (err) => {
      console.error('Google login failed:', err);
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (payload: PreferencesPayload & { userId: string }) => authApi.updatePreferences(payload),
    onSuccess: (data) => {
      const existingUserString = localStorage.getItem(USER_KEY);
      const existingUser = existingUserString ? JSON.parse(existingUserString) : {};

      const updatedUser = {
        ...existingUser,
        ...data,
        preferences: {
          ...existingUser.preferences,
          ...(data.preferences || data)
        }
      };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      queryClient.setQueryData(['currentUser'], updatedUser);
    },
    onError: (error) => {
      console.error("Preference Update Mutation Failed:", error);
    }
  });

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    queryClient.clear();
    router.push('/');
  };


  const handleUpdatePreferences = async (payload: PreferencesPayload): Promise<User> => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedUser) {
      throw new Error('User session not found');
    }

    const userData = JSON.parse(storedUser);
    const userId = userData.id || userData._id;

    if (!userId) {
      throw new Error('User ID missing in session');
    }
    return updatePreferencesMutation.mutateAsync({
      ...payload,
      userId,
    });
  };

  const isMutating =
    loginMutation.isPending ||
    registerMutation.isPending ||
    demoLoginMutation.isPending ||
    googleLoginMutation.isPending ||
    updatePreferencesMutation.isPending;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login: (email, password) => loginMutation.mutateAsync({ email, password }).then(() => { }),
        register: (name, email, password) =>
          registerMutation.mutateAsync({ name, email, password }).then(() => { }),
        demoLogin: () => demoLoginMutation.mutateAsync().then(() => { }),
        googleLogin: (credential) => googleLoginMutation.mutateAsync(credential).then(() => { }),
        logout,
        updatePreferences: handleUpdatePreferences,
        isMutating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}