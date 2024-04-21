import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  url,
  urlSmall,
  description,
  onOpenImage,
}) => {
  return (
    <li className={css['gallery-item']}>
      <img src={urlSmall} alt={description} onClick={() => onOpenImage(url)} />
    </li>
  );
};
