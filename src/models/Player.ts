import { CardModel } from "./Card";

export type PlayerModel = {
    name: string;
    cards: CardModel[];
    chips: number;
};