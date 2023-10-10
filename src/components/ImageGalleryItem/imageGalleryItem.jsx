import React from 'react';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick, largeImageURL }) => {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={src}
        alt={alt}
        className={css.image}
        onClick={handleClick}
      />
    </li>
  );
}
export default ImageGalleryItem;