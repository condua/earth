import React, { useState, useEffect, useMemo } from 'react';
import './home.css';
import img1 from '../src/images/144p.png';
import img2 from '../src/images/240p.png';
import img3 from '../src/images/360p.png';
import img4 from '../src/images/480p.png';
import img5 from '../src/images/720p.png';
import img6 from '../src/images/meo.jpg';
import img7 from '../src/images/meo2.jpg';
import img8 from '../src/images/meo3.jpg'
const Home = () => {
  const options = useMemo(() => [
    {
      quality: '144p',
      images: img1,
    },
    {
      quality: '240p',
      images: img2,
    },
    {
      quality: '360p',
      images: img3,
    },
    {
      quality: '480p',
      images: img4,
    },
    {
      quality: '720p',
      images: img5,
    },
    {
      quality: '1080p',
      images: [img6, img7, img8],
    }
  ], []);

  const [quality, setQuality] = useState('144p');
  const [image, setImage] = useState(img1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const selectedOption = options.find(option => option.quality === quality);

    if (quality === '1080p' && Array.isArray(selectedOption.images)) {
      setImage(selectedOption.images[currentIndex]);
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % selectedOption.images.length);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setImage(selectedOption.images);
    }
  }, [quality, currentIndex, options]);

  const handleChange = (event) => {
    setQuality(event.target.value);
    setCurrentIndex(0); // Reset index when quality changes
  };

  useEffect(() => {
    if (quality !== '1080p') {
      setCurrentIndex(0);
    }
  }, [quality]);

  return (
    <div className='container'>
      <img src={image} alt="Selected quality" />
      <select onChange={handleChange} value={quality}>
        {options.map((option, index) => (
          <option key={index} value={option.quality}>
            {option.quality}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Home;
