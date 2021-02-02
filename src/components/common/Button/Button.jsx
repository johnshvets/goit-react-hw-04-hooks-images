import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={s.button}>
    Load more!
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
