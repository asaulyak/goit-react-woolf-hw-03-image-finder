import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.largeImageURL}
          urlSmall={image.webformatURL}
          onOpenImage={onOpenModal}
        />
      ))}
    </ul>
  );
};
