import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

type State = {

    loading: boolean;
    error: AxiosError | null;
    GetGames: () => Promise<string[] | []>;
    GetGameAvailable: (gameId: string) => Promise<boolean>;
};

export const useGameStore = create<State>((set) => ({
    loading: false,
    error: null,
    GetGameAvailable: async (gameId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get<boolean>(`${import.meta.env.VITE_APP_DEV_URL}/api/Game/available?gameId=${gameId}`);
            set({ loading: false });
            console.log("data: ", response);
            return response.data;
        } catch (error: any) {
            set({ error, loading: false });
            return false;
        }
    },

    GetGames: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get<string[]>(`${import.meta.env.VITE_APP_DEV_URL}/api/Game/games`);
            set({ loading: false });
            console.log("data: ", response);
            return response.data;
        } catch (error: any) {
            set({ error, loading: false });
            return [];
        }
    },
}));
