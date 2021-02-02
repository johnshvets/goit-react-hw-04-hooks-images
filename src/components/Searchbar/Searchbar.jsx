import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = ({ target: { value } }) => setValue(value.toLowerCase());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim() === "") {
      return toast.error("Type your query!");
    }

    onSubmit(value);
    setValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.formButton}>
          <span className={s.formButtonLabel}>Search</span>
        </button>

        <input
          className={s.formInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
