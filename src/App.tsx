import style from "./App.module.scss";
import GameRoom from "./pages/GameRoom/GameRoom";
import { Home } from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<GameRoom />} />
    </Routes>
  );
}

export default App;
