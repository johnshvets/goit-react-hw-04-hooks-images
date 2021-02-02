import { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../common/Loader/Loader";
import Button from "../common/Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../services/pixabayApi";
import ErrorBox from "../common/Error/ErrorBox";
import s from "./ContentContainer.module.css";

class ContentContainer extends Component {
  state = {
    images: [],
    error: null,
    isFetching: false,
    status: "idle",
  };

  componentDidUpdate(prevProps) {
    const { query, page } = this.props;

    if (prevProps.query !== query) {
      this.setState({ images: [], status: "pending" });
      this.getImages();
    }

    if (page > prevProps.page) {
      this.setState({ isFetching: true });
      this.getImages();
      this.scrollPage();
    }
  }

  getImages = async () => {
    const { query, page } = this.props;
    try {
      const data = await fetchImages(query, page);
      const images = data.hits;

      if (images.length === 0) {
        throw Error(`Can't find pictures by '${query}' keyword!`);
      }

      this.setState((state) => ({
        images: [...state.images, ...images],
        isFetching: false,
        status: "resolved",
      }));
    } catch (error) {
      this.setState({ error, status: "rejected" });
    }
  };

  scrollPage = () => {
    setTimeout(
      () =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        }),
      1000
    );
  };

  render() {
    const { images, error, status, isFetching } = this.state;
    const { onBtnClick, onImageClick } = this.props;

    if (status === "idle") {
      return <div className={s.text}>Type your keyword!</div>;
    }

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "resolved") {
      return (
        <>
          <ImageGallery images={images} onImageClick={onImageClick} />

          {isFetching ? <Loader /> : <Button onClick={onBtnClick} />}
        </>
      );
    }

    if (status === "rejected") {
      return <ErrorBox errorText={error.message} />;
    }
  }
}

export default ContentContainer;

ContentContainer.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
