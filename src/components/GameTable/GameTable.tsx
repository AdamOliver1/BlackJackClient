import { useState } from "react";
import style from "./GameTable.module.scss";
import { PlayerModel } from "../../models/Player";
import { PlayerSeat } from "../PlayerSeat/PlayerSeat";
import Dealer from "../Dealer/Dealer";

type GameTableProps = {
  players: PlayerModel[];
  dealer: PlayerModel | null;
};

export const GameTable = (props: GameTableProps) => {
  return (
    <div className={style.container}>
      {/* {props.dealer && <Dealer player={props.dealer} />} */}
      {props.players.map((player, index) => (
        <PlayerSeat key={index} player={player} />
      ))}
    </div>
  );
};
