import style from "./GameTable.module.scss";
import { useRoomStore } from "../../stores/RoomStore";
import { PlayerSeat } from "../../components/PlayerSeat/PlayerSeat";
import { TableDirection } from "../../models/TableDirection";
import { PlayerModel } from "../../models/Player";

export const GameTable = () => {
  const { room, winnersId, playerId } = useRoomStore();

  const positions = [
    { top: "50%", left: "0%", transform: "translate(-50%, -50%)" }, // left
    { top: "0", left: "50%", transform: "translate(-50%, -50%)" }, // up
    { top: "50%", left: "100%", transform: "translate(-50%, -50%)" }, // right
  ];

  const getDealerPos = () => ({
    top: "100%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  const getPlayerClassName = (player: PlayerModel, index: number) => {
    let playerStyleByWin =
      winnersId == null
        ? ""
        : winnersId.includes(player.playerId)
        ? `${style.winnerBackground} `
        : `${style.loserBackground} `;
    playerStyleByWin += player.playerId == playerId ? `${style.myPlayer} ` : "";
    playerStyleByWin +=
      index % 2 != 0
        ? `${style.smallCircleSides} ${style.playerColor}`
        : `${style.smallCircleUpAndDown} ${style.playerColor}`;
    return playerStyleByWin;
  };

  return (
    <div className={style.gameTable}>
      <div
        className={`${style.dealerColor} ${style.smallCircleSides}`}
        style={getDealerPos()}
      >
        {room?.dealer && (
          <PlayerSeat
            player={room.dealer}
            tableDirection={TableDirection.DOWN}
          />
        )}
      </div>

      <div>
        {room?.players?.map((player: PlayerModel, index: any) => (
          <div
            key={index}
            className={getPlayerClassName(player, index)}
            style={positions[index]}
          >
            <PlayerSeat player={player} tableDirection={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
