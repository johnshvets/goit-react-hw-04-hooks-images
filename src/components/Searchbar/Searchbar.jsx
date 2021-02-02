import PropTypes from "prop-types";
import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    value: "",
  };

  handleChange = ({ target: { value } }) =>
    this.setState({ value: value.toLowerCase() });

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const { onSubmit } = this.props;

    if (value.trim() === "") {
      return toast.error("Type your query!");
    }

    onSubmit(value);
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
