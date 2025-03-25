import React from "react";
import { Carousel } from "antd";

import carouselImage1 from "../../assets/home/homeCarousel1.png";
import carouselImage2 from "../../assets/home/homeCarousel2.png";
import carouselImage3 from "../../assets/home/homeCarousel3.png";
import carouselImage4 from "../../assets/home/homeCarousel4.png";
import carouselImage5 from "../../assets/home/homeCarousel5.png";
import carouselImage6 from "../../assets/home/homeCarousel6.png";
import carouselImage7 from "../../assets/home/homeCarousel7.png";

const carouselImages = [
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselImage4,
  carouselImage5,
  carouselImage6,
  carouselImage7,
];

const Slider = () => {
  return (
    <Carousel autoplay dots='' className="w-full h-full">
      {carouselImages.map((image, index) => (
        <div key={index} className="flex justify-center w-full">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-40 sm:h-60 md:h-72 lg:h-96 object-contain mx-auto"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
