import style from "./PlayerSeat.module.scss";
import { PlayerModel } from "../../models/Player";
import { Card } from "../Card/Card";

type PlayerSeatProps = {
  player: PlayerModel;
};

export const PlayerSeat = (props: PlayerSeatProps) => {
  return (
    <div className={style.container}>
      <h2>{props.player.name}</h2>
      {/* Show the player's cards */}
      {/* {props.player.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))} */}
      {/* Show the player's chips */}
      <p>Chips: {props.player.chips}</p>
    </div>
  );
};
