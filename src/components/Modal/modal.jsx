import React from 'react';
import css from './modal.module.css';
import { useEffect } from 'react';

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

 

  return (
    <div className={css.overlay} onClick={onClose}>
      <img src={src} alt={alt} className={css.image} />
    </div>
  );
};

export default Modal;
