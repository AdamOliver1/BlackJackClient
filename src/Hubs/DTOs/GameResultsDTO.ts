import { Room } from "../../models/Room"

export type GameResultsDTO = {
    game: Room;
    winnersId: string[];
}