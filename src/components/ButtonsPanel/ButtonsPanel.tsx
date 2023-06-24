import style from "./ButtonsPanel.module.scss";
import { useRoomStore } from "../../stores/RoomStore";
import { Butten } from "../../utils/Button/Button";
import { useNavigate } from "react-router-dom";
import { GameState } from "../../models/GameState";

export const ButtonsPanel = ({ gameHub }: any) => {
  const {
    room,
    playerId,
    playersTurnId,
    gameState,
    setGameState,
    setPlayersTurnId,
  } = useRoomStore();

  const navigator = useNavigate();
  const checkTurn = (): boolean => playerId == playersTurnId;

  const onStartGame = () => {
    if (gameState == GameState.BEFORE_GAME) {
      gameHub.startGame();
      if (room) setPlayersTurnId(room.players[0].playerId);
      setGameState(GameState.PLAYING);
    }
  };

  const OnDrawCard = () => {
    gameHub.playerDrawCard();
  };

  const onExitGame = () => {
    gameHub.PlayerExitGame();
    navigator("/");
  };

  const onStand = () => {
    const nextPlayer = room?.currentPlayer?.nextPlayer?.playerId;
    if (nextPlayer) gameHub.nextTurn();
    else {
      gameHub.FinishRound();
    }
  };

  const onAnotherRound = () => {
    setGameState(GameState.BEFORE_GAME);
    gameHub.playAnotherRound();
  };

  return (
    <div className={style.btnStart}>
      {gameState == GameState.AFTER_GAME && (
        <>
          <Butten disable={false} onClick={onAnotherRound}>
            Another Round!
          </Butten>
          <Butten disable={false} onClick={onExitGame}>
            Exit Room
          </Butten>
        </>
      )}

      {gameState == GameState.BEFORE_GAME && (
        <Butten disable={false} onClick={onStartGame}>
          Start Game
        </Butten>
      )}

      {gameState == GameState.PLAYING && (
        <>
          <Butten disable={!checkTurn()} onClick={OnDrawCard}>
            Hit me!
          </Butten>
          <Butten disable={!checkTurn()} onClick={onStand}>
            Stand
          </Butten>
        </>
      )}
    </div>
  );
};
