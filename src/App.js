import s from "./App.module.css";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from "react";
import Searchbar from "./component/Searchbar/Searchbar";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import Button from "./component/Button/Button";
import Modal from "./component/Modal/Modal";
import Loader from "react-loader-spinner";

class App extends Component {
  state = {
    cards: [],
    images: "",
    largeImage: "",
    tags: "",
    pageNumber: 1,
    isLoading: false,
    modal: false,
    button: false,
  };
  onSubmit = ({ images }) => {
    this.setState({
      images: images,
      pageNumber: 1,
      cards: [],
      largeImage: "",
      tags: "",
      button: false,
    });
  };
  onPressBtn = () => {
    this.setState(() => ({
      pageNumber: this.state.pageNumber + 1,
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };
  componentDidUpdate(prevProps, prevState) {
    const { baseURL, image_type, orientation, per_page, key } = {
      baseURL: "https://pixabay.com/api/",
      image_type: "photo",
      orientation: "horizontal",
      per_page: "12",
      key: "23000349-69c2b90ac6d14094754d4ad57",
    };
    const { images, pageNumber } = this.state;
    if (prevState.images !== images || prevState.pageNumber !== pageNumber) {
      this.setState({ isLoading: true });
      axios
        .get(
          `${baseURL}?image_type=${image_type}&orientation=${orientation}&q=${this.state.images}&page=${this.state.pageNumber}&per_page=${per_page}&key=${key}`
        )
        .then((res) => {
          this.setState((prevState) => ({
            cards: [...prevState.cards, ...res.data.hits],
          }));
        })
        .catch((error) => console.log())
        .finally(() => this.setState({ isLoading: false }));
    }

    if (this.state.cards.length > 11 && this.state.button === false) {
      this.setState({
        button: true,
      });
    } else if (this.state.cards.length < 12 && this.state.button === true) {
      this.setState({
        button: false,
      });
    }
  }

  largeImage = (largeImage, tags) => {
    this.setState({
      largeImage: largeImage,
      tags: tags,
      modal: !this.state.modal,
    });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        <ImageGallery cards={this.state.cards} onClickImage={this.largeImage} />

        {this.state.button && <Button onClick={this.onPressBtn} />}
        {this.state.modal && (
          <Modal
            largeImage={this.state.largeImage}
            tags={this.state.tags}
            toggle={this.toggle}
          />
        )}
      </div>
    );
  }
}

export default App;
