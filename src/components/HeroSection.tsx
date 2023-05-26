import Carousel from "./ui/carousel/Carousel";

const data = [
  {
    image: "/images/slide_coupon.jpg",
    caption: ` `,
  },
  {
    image: "/images/slide_mouse.jpg",
    isLink: true,
    link: "/mouse",
    caption: "<Link to='/mouse'>SHOP NOW</Link>",
  },
  {
    image: "/images/slide_music.webp",
    isLink: true,
    link: "/music",
    caption: "<Link to='/music'>SHOP NOW</Link>",
  },
  {
    image: "/images/slide_smartphones.jpg",
    isLink: true,
    link: "/smartphones",
    caption: "<Link to='/smart-phones'>SHOP NOW</Link>",
  },
  {
    image: "/images/slide_summer_sale.webp",
    caption: "",
  },
];

const HeroSection = () => {
  // const imgArr = images.map((image) => image.url);

  return (
    <>
      <Carousel
        data={data}
        time={3000}
        radius="10px"
        captionPosition="center"
        automatic={true}
        width={1536}
        height={400}
        dots={true}
        slideImageFit="cover"
      />
    </>
  );
};

export default HeroSection;
