import { useEffect } from "react";
import style from "./GameRoom.module.scss";
import { useRoomStore } from "../../stores/RoomStore";
import { useLocation } from "react-router-dom";
import useGameHubConnection from "../../Hubs/useGameHubConnection";
import { GameState } from "../../models/GameState";
import { ButtonsPanel } from "../../components/ButtonsPanel/ButtonsPanel";
import { GameTable } from "../../components/GameTable/GameTable";
import { Error } from "../../components/Error/Error";

const GameRoom = () => {
  const {
    room,
    error,
    playerId,
    playersTurnId,
    isHubConnected,
    gameState,
    setPlayersTurnId,
    setPlayerId,
    setGameId,
  } = useRoomStore();

  const gameHub = useGameHubConnection();
  const location = useLocation();

  useEffect(() => {
    const gameId = location.state.gameId;
    setGameId(gameId);
    console.log("gameState: ", gameState);
  }, []);

  useEffect(() => {
    console.log("gameState: ", gameState);

    gameHub.JoinGame();
    console.log("isHubConnected: ", isHubConnected);
  }, [isHubConnected]);

  useEffect(() => {
    firstEnteredActions();
    ifMyTurnAndHandNotValidActions();
  }, [room]);

  const firstEnteredActions = () => {
    console.log("firstEnteredActions: ", room);
    console.log("playerId: ", playerId);
    console.log("playerId: ", playersTurnId);
    if (room && playerId == "") {
      console.log("firstEnteredActions: after");

      setPlayerId(room.players[room.players.length - 1].playerId);
      if (room?.players.length == 3 && gameState == GameState.BEFORE_GAME) {
        gameHub.startGame();
        setPlayersTurnId(room.players[0].playerId);
      }
    }
  };

  const ifMyTurnAndHandNotValidActions = () => {
    if (playerId == playersTurnId && !room?.currentPlayer?.isHandValid) {
      const nextPlayer = room?.currentPlayer.nextPlayer;
      if (nextPlayer == undefined) {
        gameHub.FinishRound();
      } else {
        setPlayersTurnId(nextPlayer.playerId);
        gameHub.nextTurn();
      }
    }
  };

  return (
    <div className={style.container}>
      <ButtonsPanel gameHub={gameHub} />
      {error && <Error error={error} />}
      <GameTable />
    </div>
  );
};

export default GameRoom;
