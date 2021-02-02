import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={s.imageGallery}>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        img={webformatURL}
        description={tags}
        largeImg={largeImageURL}
        onClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};
