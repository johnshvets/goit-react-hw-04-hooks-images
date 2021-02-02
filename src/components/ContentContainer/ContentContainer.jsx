import PropTypes from "prop-types";
import Loader from "../common/Loader/Loader";
import Button from "../common/Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../services/pixabayApi";
import ErrorBox from "../common/Error/ErrorBox";
import s from "./ContentContainer.module.css";
import { useEffect, useState } from "react";

const ContentContainer = ({ query, page, onBtnClick, onImageClick }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getImages = async () => {
      try {
        const data = await fetchImages(query, page);
        const images = data.hits;

        if (images.length === 0) {
          throw Error(`Can't find pictures by '${query}' keyword!`);
        }

        setImages((state) => [...state, ...images]);
        setIsFetching(false);
        setStatus("resolved");
      } catch (error) {
        setError(error);
        setStatus("rejected");
      }
    };

    if (page > 1) {
      setIsFetching(true);
      getImages();
      setTimeout(
        () =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          }),
        1000
      );
    } else {
      setImages([]);
      setStatus("pending");
      getImages();
    }
  }, [query, page]);

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
};

export default ContentContainer;

ContentContainer.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
