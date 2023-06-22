import style from "./App.module.scss";
import GameRoom from "./components/GameRoom/GameRoom";

function App() {
  return (
    <div className={style.container}>
      <GameRoom />
    </div>
  );
}

export default App;
