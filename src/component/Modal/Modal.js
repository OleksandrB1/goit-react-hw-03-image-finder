import { Component } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.pressingEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.pressingEsc);
  }

  pressingEsc = (event) => {
    if (event.code !== "Escape") {
      return;
    }
    this.props.toggle();
  };

  backdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.toggle();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.backdropClick}>
        <div className={s.Modal}>
          <img
            src={this.props.largeImage}
            alt={this.props.tags}
            className={s.Image}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
