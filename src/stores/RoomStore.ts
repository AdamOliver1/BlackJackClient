import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { Room } from '../models/Room';
import { GameState } from '../models/GameState';

type State = {
    room: Room | null;
    isHubConnected: boolean;
    playerId: string;
    playersTurnId: string;
    gameId: string;
    winnersId: string[] | null;
    loading: boolean;
    gameState: GameState;
    error: AxiosError | null;
    setGameId: (gameId: string) => void;
    setRoom: (room: Room | null) => void;
    setGameState: (gameState: GameState) => void;
    setWinnersId: (winnersId: string[] | null) => void;
    setPlayerId: (playersId: string) => void;
    setPlayersTurnId: (playersId: string) => void;
    setIsHubConnected: (bool: boolean) => void;
};

export const useRoomStore = create<State>((set) => ({
    room: null,
    playerId: "",
    playersTurnId: "",
    gameId: "",
    gameState: GameState.BEFORE_GAME,
    isHubConnected: false,
    winnersId: null,
    loading: false,
    error: null,
    setGameId: (gameId: string) => set({ gameId }),
    setGameState: (gameState: GameState) => set({ gameState }),
    setWinnersId: (winnersId: string[] | null) => set({ winnersId }),
    setIsHubConnected: (isHubConnected: boolean) => set({ isHubConnected }),
    setRoom: (room: Room | null) => set({ room }),
    setPlayerId: (playerId: string) => set({ playerId }),
    setPlayersTurnId: (playersTurnId: string) => set({ playersTurnId }),



}));
