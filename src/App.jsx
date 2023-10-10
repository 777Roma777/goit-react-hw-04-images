import React from 'react';
import { fetchImages } from 'Service/api';
import { RotatingLines } from 'react-loader-spinner';
import Searchbar from 'components/Searchbar/searchBar';
import ImageGalleryItem from 'components/ImageGalleryItem/imageGalleryItem';
import ImageGallery from 'components/ImageGallery/imageGallery';
import Button from 'components/Button/button';
import Modal from 'components/Modal/modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (page || query) {
        setIsLoading(true);
        try {
          const data = await fetchImages(query, page);
          setImages(prevImages =>
            page === 1 ? data.hits : [...prevImages, ...data.hits]
          );
        } catch (error) {
          console.error('Error requesting images:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [page, query]);

  const handleSearch = newQuery => {

    setQuery(newQuery);
      setImages([]);
      setPage(1);

  };

  const loadMoreImages = () => {

    setPage(prevState => prevState + 1);
  };

  const openModal = selectedImage => {
    setSelectedImage(selectedImage)
  };

  const closeModal = () => {

    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.id}
            onClick={() => openModal(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading ? (
        <RotatingLines />
      ) : (
        images.length > 0 && <Button onClick={loadMoreImages} />
      )}
      {selectedImage && (
        <Modal
          src={selectedImage}
          alt="Selected Image"
          onClose={closeModal}
        />
      )}
    </div>
  );
};
