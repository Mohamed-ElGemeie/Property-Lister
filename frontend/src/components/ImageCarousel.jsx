'use client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageCarousel({ images, height = 420 }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div
      className="w-full overflow-hidden rounded-2xl mb-6"
      style={{ height: `${height}px` }}
    >
      <Slider {...settings}>
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src="placeholder.png"
              alt="placeholder"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        )}
      </Slider>
    </div>
  );
}
