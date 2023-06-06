import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  images: Array<string>;
  width: number;
  height: number;
  loop: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  showArrowControls: boolean;
  showDotControls: boolean;
  bgColor: string;
}

const SwiperSlider: FC<Props> = ({ images }) => {
  const slides = images.map((image, i) => (
    <SwiperSlide
      key={i}
      className="flex items-center justify-center text-center bg-red-400">
      <img
        src={image}
        alt="Screen"
        className="block object-cover w-full h-full"
      />
    </SwiperSlide>
  ));

  return (
    <Swiper
      className="w-full h-full"
      //   spaceBetween={50}
      //   slidesPerView={3}
      onSlideChange={() => console.log("onChange slide")}
      onSwiper={(swiper) => console.log("onSwiper", swiper)}>
      {slides}
    </Swiper>
  );
};

export default SwiperSlider;
