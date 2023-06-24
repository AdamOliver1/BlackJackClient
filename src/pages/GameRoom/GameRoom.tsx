import { useState, useEffect } from "react";
import style from "./GameRoom.module.scss";
import { Butten } from "../../utils/Button/Button";
import { useRoomStore } from "../../stores/RoomStore";
import { PlayerSeat } from "../../components/PlayerSeat/PlayerSeat";
import { useLocation, useNavigate } from "react-router-dom";
import useGameHubConnection from "../../Hubs/GameHub/useGameHubConnection";
import { TableDirection } from "../../models/TableDirection";
import { PlayerModel } from "../../models/Player";
import { GameState } from "../../models/GameState";

const GameRoom = () => {
  const {
    room,
    error,
    playerId,
    playersTurnId,
    isHubConnected,
    winnersId,
    gameState,
    gameId,
    setPlayersTurnId,
    setPlayerId,
    setGameState,
    setGameId,
  } = useRoomStore();

  const gameHub = useGameHubConnection();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    const gameId = location.state.gameId;
    setGameId(gameId);
  }, []);

  const ifIsConnected = () =>
    isHubConnected && gameId && sessionStorage.getItem("is_in_game") == null;

  useEffect(() => {
    // if (ifIsConnected()) {
    gameHub.JoinGame();
    console.log(
      "ifIsConnected ifIsConnected ifIsConnected ifIsConnected ifIsConnected ifIsConnected ifIsConnected"
    );
    sessionStorage.setItem("is_in_game", "is_in_game");
    // }
  }, [isHubConnected]);

  useEffect(() => {
    console.log("room: ", room);
    if (room && playerId == "") {
      console.log(
        "ifFirstEntered ifFirstEntered ifFirstEntered ifFirstEntered ifFirstEntered "
      );

      setPlayerId(room.players[room.players.length - 1].playerId);
      sessionStorage.setItem("player_id", "player_id");
      if (room?.players.length == 3) {
        startGame();
      }
    }

    if (playerId == playersTurnId && !room?.currentPlayer?.isHandValid) {
      const nextPlayer = room?.currentPlayer.nextPlayer;
      if (nextPlayer == undefined) {
        gameHub.FinishRound();
      } else {
        setPlayersTurnId(nextPlayer.playerId);
        gameHub.nextTurn();
      }
    }
  }, [room]);

  const onStandBtnClick = () => {
    const nextPlayer = room?.currentPlayer?.nextPlayer?.playerId;
    console.log("room: ", room);
    console.log("onStandBtnClick nextPlayer: ", nextPlayer);
    if (nextPlayer) gameHub.nextTurn();
    else {
      gameHub.FinishRound();
    }
  };

  const checkTurn = (): boolean => playerId == playersTurnId;

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

  const startGame = () => {
    if (gameState == GameState.BEFORE_GAME) {
      gameHub.startGame();
    }
  };

  const OnDrawCard = () => {
    gameHub.playerDrawCard();
  };

  const onExitGame = () => {
    gameHub.PlayerExitGame();
    navigator("/");
  };

  const onAnotherRound = () => {
    setGameState(GameState.BEFORE_GAME);
    gameHub.playAnotherRound();
  };

  const getPlayerClassName = (player: PlayerModel, index: number) => {
    const playerStyleByWin =
      winnersId == null
        ? ""
        : winnersId.includes(player.playerId)
        ? `${style.winnerBackground} `
        : `${style.loserBackground} `;

    return (
      playerStyleByWin +
      (index % 2 != 0
        ? `${style.smallCircleSides} ${style.playerColor}`
        : `${style.smallCircleUpAndDown} ${style.playerColor}`)
    );
  };

  return (
    <div className={style.container}>
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
          <Butten disable={false} onClick={startGame}>
            Start Game
          </Butten>
        )}

        {gameState == GameState.PLAYING && (
          <>
            <Butten disable={!(playerId == playersTurnId)} onClick={OnDrawCard}>
              Hit me!
            </Butten>
            <Butten disable={!checkTurn()} onClick={onStandBtnClick}>
              Stick
            </Butten>
          </>
        )}
      </div>

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
    </div>
  );
};

export default GameRoom;
