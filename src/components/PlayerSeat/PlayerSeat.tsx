import style from "./PlayerSeat.module.scss";
import { PlayerModel } from "../../models/Player";
import { useRoomStore } from "../../stores/RoomStore";
import { Card } from "../Card/Card";
import { TableDirection } from "../../models/TableDirection";
import { GameState } from "../../models/GameState";

type PlayerSeatProps = {
  player: PlayerModel;
  tableDirection: TableDirection;
};
export const PlayerSeat = ({ player, tableDirection }: PlayerSeatProps) => {
  const { gameState } = useRoomStore();

  const getStyleByTableDirection = (tableDirection: TableDirection) => {
    return (
      style.container +
      (tableDirection == TableDirection.LEFT
        ? ` ${style.left}`
        : tableDirection == TableDirection.UP
        ? ` ${style.up}`
        : tableDirection == TableDirection.RIGHT
        ? ` ${style.right}`
        : ` ${style.down}`)
    );
  };
  const addBlankCardIfDealer = () => {
    return player.cards.length == 1;
  };

  return (
    <>
      {gameState != GameState.BEFORE_GAME && (
        <div className={getStyleByTableDirection(tableDirection)}>
          {player.cards.map((card, index) => {
            return (
              <Card
                playerId={player.playerId}
                key={index}
                card={card}
                isOpen={true}
              ></Card>
            );
          })}
          {addBlankCardIfDealer() && (
            <Card playerId={player.playerId} card={null} isOpen={false}></Card>
          )}
        </div>
      )}
    </>
  );
};
