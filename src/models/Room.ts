import { PlayerModel as PlayerModel } from "./Player";

export type Room = {
    gameId: string;
    currentPlayer: PlayerModel;
    players: PlayerModel[];
    dealer: PlayerModel;
};