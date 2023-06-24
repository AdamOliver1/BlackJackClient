import style from "./Error.module.scss";
export const Error = (error: any) => {
  return <div className={style.error}>{error}</div>;
};
