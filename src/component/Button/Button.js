import s from "./Button.module.css";

const Button = ({ onClick }) => (
  <button type="button" className={s.button} onClick={onClick}>
    <span>Load more</span>
  </button>
);

export default Button;
