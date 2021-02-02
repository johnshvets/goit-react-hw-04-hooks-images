import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import s from "./App.module.css";
import Modal from "./components/common/Modal/Modal";
import ContentContainer from "./components/ContentContainer/ContentContainer";

class App extends Component {
  state = {
    imageQuery: "",
    page: 1,
    showModal: false,
    imgDescription: "",
    modalImg: "",
  };

  onSubmit = (imageQuery) => this.setState({ imageQuery, page: 1 });

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false, imgDescription: "", modalImg: "" });
  };

  openModal = ({ target: { alt, dataset } }) => {
    this.setState({
      showModal: true,
      imgDescription: alt,
      modalImg: dataset.url,
    });
  };

  render() {
    const {
      imageQuery,
      page,
      showModal,
      imgDescription,
      modalImg,
    } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSubmit} />

        <ContentContainer
          query={imageQuery}
          page={page}
          onBtnClick={this.onLoadMoreClick}
          onImageClick={this.openModal}
        />

        <ToastContainer autoClose={3000} />

        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={modalImg} alt={imgDescription} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
