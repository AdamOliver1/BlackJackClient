import style from "./Home.module.scss";
import { useGameStore } from "../../stores/GameStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../stores/RoomStore";

export const Home = () => {
  const navigator = useNavigate();
  const { GetGames, GetGameAvailable } = useGameStore();
  const { setRoom } = useRoomStore();
  const [games, setGames] = useState<string[]>([]);
  useEffect(() => {
    GetGamesFromStore();
    setRoom(null);
  }, []);

  const GetGamesFromStore = async () => {
    setGames(await GetGames());
  };

  const handleEnterGame = async (gameId: string) => {
    if (await GetGameAvailable(gameId))
      navigator("game", { state: { gameId } });
    else alert("ROOM IS FULL");
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Black Jack</h1>
      {games &&
        games.map((game, index) => {
          return (
            <div
              onClick={() => handleEnterGame(game)}
              className={style.gameBtn}
              key={index}
            >
              room {game}
            </div>
          );
        })}
    </div>
  );
};
