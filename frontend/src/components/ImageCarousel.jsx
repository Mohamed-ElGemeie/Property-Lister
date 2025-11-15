'use clie'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageCarousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    arrows: false,
  };

  return (
    <div className={`w-full h-[50vh]  overflow-hidden rounded-2xl mb-6`}>
      <Slider {...settings}>
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className={`w-fullh-[50vh]  object-cover rounded-2xl`}
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src="placeholder.png"
              alt="placeholder"
              className={`w-full h-[50vh]  object-cover rounded-2xl`}
            />
          </div>
        )}
      </Slider>
    </div>
  );
}
