import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    images: "",
  };
  change = (event) => {
    this.setState({ images: event.currentTarget.value.toLowerCase() });
  };
  submit = (event) => {
    event.preventDefault();
    if (this.state.images.trim() === "") {
      // ****************************************   Alert  *******************

      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ images: "" });
  };

  render() {
    return (
      <div>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={this.submit}>
            <button type="submit" className={s.searchFormButton}>
              <span className={s.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.images}
              onChange={this.change}
            />
          </form>
        </header>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
