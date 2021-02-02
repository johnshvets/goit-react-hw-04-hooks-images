import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ img, description, largeImg, onClick }) => (
  <li className={s.item}>
    <img
      src={img}
      alt={description}
      className={s.image}
      data-url={largeImg}
      onClick={onClick}
    />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
