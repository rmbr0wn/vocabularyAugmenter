import React, { useState, useEffect } from 'react';

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = []
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageUrls(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange}/>
      { imageUrls.map(imageSrc => <img src={imageSrc} alt="0"/>) }
    </>
  );
}
