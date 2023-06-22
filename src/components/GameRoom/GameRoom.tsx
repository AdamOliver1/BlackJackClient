import { useState, useEffect } from "react";
import style from "./GameRoom.module.scss";
import { PlayerModel } from "../../models/Player";
import { GameTable } from "../GameTable/GameTable";

const initialPlayers: PlayerModel[] = [
  { name: "Player 1", cards: [], chips: 1000 },
  { name: "Player 2", cards: [], chips: 1000 },
  { name: "Player 3", cards: [], chips: 1000 },
];

const GameRoom = () => {
  const [players, setPlayers] = useState<PlayerModel[]>(initialPlayers);
  const [dealer, setDealer] = useState<PlayerModel | null>({
    name: "Dealer",
    cards: [],
    chips: Infinity,
  });

  return (
    <div className={style.container}>
      <div className="circle-container">
        <div className="circle">
          <div className="person dealer rotate-0">foo</div>
          <div className="person player rotate-120">dfgdg</div>
          <div className="person player rotate-180">dfgfd</div>
          <div className="person player rotate-240">dfgf</div>
        </div>
      </div>

      {/* GameRoom */}
      {/* <GameTable players={players} dealer={dealer} /> */}
    </div>
  );
};

export default GameRoom;
