import style from "./Home.module.scss";
import { useGamesStore } from "../../stores/GamesStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../stores/RoomStore";
import { Butten } from "../../utils/Button/Button";

export const Home = () => {
  const navigator = useNavigate();
  const { GetGames, GetGameAvailable } = useGamesStore();
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

  const onHelpClick = () => {
    alert(`
Welcome! Here are some quick guidelines for our game:

- Your player indicator will be highlighted in blue.
- The player whose turn it is will have their cards glowing.

Enjoy your game!

    `);
  };

  return (
    <div className={style.container}>
      <h1 onClick={onHelpClick} className={style.title}>
        Black Jack
      </h1>

      {games &&
        games.map((game, index) => {
          return (
            <div
              onClick={() => handleEnterGame(game)}
              className={style.gameBtn}
              key={index}
            >
              room {index + 1}
            </div>
          );
        })}
    </div>
  );
};
