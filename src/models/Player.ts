import { CardModel } from "./Card";

export type PlayerModel = {
    playerId: string;
    cards: CardModel[];
    nextPlayer: PlayerModel | null;
    isHandValid: boolean;
};