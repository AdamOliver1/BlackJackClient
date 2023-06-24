// import style from "./Card.module.scss";
// import { useRoomStore } from "../../stores/RoomStore";
// import { Butten } from "../../utils/Button/Button";

// type ButtonPanelProps = {
//   card: CardModel | null;
//   isOpen: boolean;
//   playerId: string;
// };

// export const ButtonPanel = ({}: ButtonPanelProps) => {
//   const { playersTurnId, winnersId, playerId } = useRoomStore();

//   const checkTurn = (): boolean => playerId == playersTurnId;

//   return (
//     <div className={style.btnStart}>
//       {winnersId != null && (
//         <>
//           <Butten disable={false} onClick={onAnotherRound}>
//             Another Round!
//           </Butten>
//           <Butten disable={false} onClick={onExitGame}>
//             Exit Room
//           </Butten>
//         </>
//       )}
//       {!isGameStarted ? (
//         <Butten disable={false} onClick={startGame}>
//           Start Game
//         </Butten>
//       ) : (
//         <>
//           <Butten disable={!(playerId == playersTurnId)} onClick={OnDrawCard}>
//             Hit me!
//           </Butten>
//           <Butten disable={!checkTurn()} onClick={onStandBtnClick}>
//             Stick
//           </Butten>
//         </>
//       )}
//     </div>
//   );
// };
