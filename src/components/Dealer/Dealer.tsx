import style from "./Dealer.module.scss";
import { PlayerModel } from "../../models/Player";
import { Card } from "../Card/Card";

type DealerProps = {
  player: PlayerModel;
};

const Dealer = ({ player }: DealerProps) => {
  return (
    <div className={style.container}>
      <h2>Dealer</h2>
      {/* Show the dealer's cards */}
      {/* {player.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))} */}
    </div>
  );
};

export default Dealer;
