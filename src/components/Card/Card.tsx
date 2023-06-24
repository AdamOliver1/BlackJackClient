import style from "./Card.module.scss";
import { CardModel } from "../../models/Card";
import { Suit } from "../../models/Suit";
import spades from "../../assets/images/spades.svg";
import hearts from "../../assets/images/heartss.svg";
import clubs from "../../assets/images/clubs.svg";
import dimons from "../../assets/images/dimons.svg";
import { useRoomStore } from "../../stores/RoomStore";

type CardProps = {
  card: CardModel | null;
  isOpen: boolean;
  playerId: string;
};

export const Card = ({ playerId, card, isOpen }: CardProps) => {
  const { playersTurnId } = useRoomStore();

  const getSuitIcon = (suit: Suit) => {
    return suit == Suit.Spades
      ? spades
      : suit == Suit.Hearts
      ? hearts
      : suit == Suit.Dimonds
      ? dimons
      : clubs;
  };

  const getIsPlayerTurn = () => {
    return playerId == playersTurnId ? style.playerTurn : "";
  };

  const getCardNumber = (number: number) => {
    return number == 13
      ? "K"
      : number == 12
      ? "Q"
      : number == 11
      ? "J"
      : number == 1
      ? "A"
      : number;
  };

  const getCardBackground = () => {
    return isOpen ? style.opened : style.closed;
  };

  return (
    <div
      className={`${
        style.container
      } ${getCardBackground()} ${getIsPlayerTurn()}`}
    >
      {card && isOpen && (
        <>
          <div>{getCardNumber(card.number)}</div>
          <img className={style.img} src={getSuitIcon(card.suit)} alt="suit" />;
        </>
      )}
      {!isOpen && (
        <>
          <div className={style.closed}>close</div>
          <div className={style.closed}></div>
        </>
      )}
    </div>
  );
};
