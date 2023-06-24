import style from "./Button.module.scss";

interface StartGameButtonProps {
  onClick: () => void;
  disable: boolean;
  children: React.ReactNode;
}
export const Butten = ({
  onClick,
  children,
  disable = false,
}: StartGameButtonProps) => (
  <button disabled={disable} className={style.button} onClick={onClick}>
    {children}
  </button>
);
