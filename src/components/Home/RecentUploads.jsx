import React from "react";
import { NavLink } from "react-router-dom";
import carouselImage1 from "../../assets/home/homeCarousel1.png";
import carouselImage2 from "../../assets/home/homeCarousel2.png";
import carouselImage3 from "../../assets/home/homeCarousel3.png";
import carouselImage4 from "../../assets/home/homeCarousel4.png";
import carouselImage5 from "../../assets/home/homeCarousel5.png";
import carouselImage6 from "../../assets/home/homeCarousel6.png";
import carouselImage7 from "../../assets/home/homeCarousel7.png";

const carouselImages = [
  { src: carouselImage1, name: "Image 1", link: "./image1" },
  { src: carouselImage2, name: "Image 2", link: "./image2" },
  { src: carouselImage3, name: "Image 3", link: "./image3" },
  { src: carouselImage4, name: "Image 4", link: "./image4" },
  { src: carouselImage5, name: "Image 5", link: "./image5" },
  { src: carouselImage6, name: "Image 6", link: "./image6" },
  { src: carouselImage7, name: "Image 7", link: "./image7" },
];


const ContinuousSlider = () => {
  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex w-max animate-scroll-ltr" style={{ animationDuration: "50s" }}>
        {[...carouselImages, ...carouselImages].map((image, index) => (
          <div key={index} className="flex justify-center w-auto px-2">
            <NavLink to={image.link}  rel="noopener noreferrer">
              <img
                src={image.src}
                alt={image.name}
                className="h-30 sm:h-40 md:h-50 lg:h-60 object-contain mx-auto"
              />
              <p className="text-center text-sm mt-2">{image.name}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinuousSlider;



