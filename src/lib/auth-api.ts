import { api } from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface PreferencesPayload {
    interests: string[];
    budgetRange: string;
    travelStyle: string;
}

export const authApi = {
    login: (email: string, password: string) =>
        api.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data),

    register: (name: string, email: string, password: string) =>
        api.post<AuthResponse>('/auth/register', { name, email, password }).then((r) => r.data),

    demoLogin: () =>
        api.post<AuthResponse>('/auth/demo-login').then((r) => r.data),

    googleLogin: (credential: string) =>
        api.post<AuthResponse>('/auth/google', { credential }).then((r) => r.data),

    updatePreferences: async (payload: PreferencesPayload & { userId: string }): Promise<User> => {
        const response = await api.put<User>('/ai/preferences', payload);
        return response.data;
    }
};