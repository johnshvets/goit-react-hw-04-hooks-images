import PropTypes from "prop-types";
import s from "./ErrorBox.module.css";

const ErrorBox = ({ errorText }) => (
  <div className={s.container}>
    <img
      src="https://petskb.com/wp-content/uploads/2019/08/catcrying.png"
      alt="Cat"
      width="300"
    />
    <p className={s.error}>{errorText}</p>
  </div>
);

export default ErrorBox;

ErrorBox.propTypes = {
  errorText: PropTypes.string.isRequired,
};
