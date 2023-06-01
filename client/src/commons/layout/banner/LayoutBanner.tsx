import { SliderItem, Wrapper } from "./LayoutBannerStyles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function LayoutBanner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem src="/images/layout/banner01.png" />
        </div>
        <div>
          <SliderItem src="/images/layout/banner02.png" />
        </div>
      </Slider>
    </Wrapper>
  );
}
