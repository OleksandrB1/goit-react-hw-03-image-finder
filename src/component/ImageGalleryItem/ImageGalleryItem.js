import s from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({ cards, onClickImage }) => {
  return cards.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li key={id} className={s.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItemImage}
        onClick={() => onClickImage(largeImageURL, tags)}
      />
    </li>
  ));
};
export default ImageGalleryItem;
