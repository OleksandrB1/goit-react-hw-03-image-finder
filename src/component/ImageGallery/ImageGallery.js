import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ cards, onClickImage }) => (
  <ul className={s.imageGallery}>
    <ImageGalleryItem cards={cards} onClickImage={onClickImage} />
  </ul>
);

export default ImageGallery;
