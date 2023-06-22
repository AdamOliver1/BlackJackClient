import style from "./Card.module.scss";
import { CardModel } from "../../models/Card";

type CardProps = {
  card: CardModel;
};

export const Card = ({ card }: CardProps) => {
  return (
    <div className={style.container}>
      <p>
        {card.value} of {card.suit}
      </p>
    </div>
  );
};
