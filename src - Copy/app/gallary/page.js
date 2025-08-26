// pages/gallery.tsx

import { useEffect, useState } from 'react';

const API_KEY = 'YOUR_PIXABAY_API_KEY'; // Replace with your real key

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=flowers&image_type=photo`)
      .then(res => res.json())
      .then(data => setImages(data.hits));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 200px)', gap: '10px' }}>
      {images.map((img) => (
        <img key={img.id} src={img.previewURL} alt={img.tags} width={200} height={150} />
      ))}
    </div>
  );
}
