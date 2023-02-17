import { Image, Flex, Spacer } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ slides }) => {
  return (

    <div id="#home">
      <Carousel autoPlay infiniteLoop showArrows={false}>
        {slides.map((slide) => {
          return <Image src={slide.image} height="90vh" width="80%" />;
        })}
      </Carousel>
    </div>

  );
};

export default ImageSlider;
