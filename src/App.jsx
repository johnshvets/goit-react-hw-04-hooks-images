import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import s from "./App.module.css";
import Modal from "./components/common/Modal/Modal";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import { useState } from "react";

const App = () => {
  const [imageQuery, setImageQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imgDescription, setImgDescription] = useState("");
  const [modalImg, setModalImg] = useState("");

  const onSubmit = (imageQuery) => {
    setImageQuery(imageQuery);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage((page) => page + 1);
  };

  const openModal = ({ target: { alt, dataset } }) => {
    setShowModal(true);
    setImgDescription(alt);
    setModalImg(dataset.url);
  };

  const closeModal = () => {
    setShowModal(false);
    setImgDescription("");
    setModalImg("");
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSubmit} />

      <ContentContainer
        query={imageQuery}
        page={page}
        onBtnClick={onLoadMoreClick}
        onImageClick={openModal}
      />

      <ToastContainer autoClose={3000} />

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImg} alt={imgDescription} />
        </Modal>
      )}
    </div>
  );
};

export default App;
