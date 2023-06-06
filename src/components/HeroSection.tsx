import Carousel from "./ui/carousel/Carousel";

const data = [
  {
    image: "/images/slide_coupon.jpg",
    caption: ` `,
  },
  {
    image: "/images/slide_tv.jpg",
    isLink: true,
    link: "/products/all?brand=sony",
    caption: "<Link to='/mouse'>BROWS NOW</Link>",
  },
  {
    image: "/images/slide_music.webp",
    isLink: true,
    link: "/category/headphones",
    caption: "<Link to='/music'>SHOP NOW</Link>",
  },
  {
    image: "/images/slide_smartphones.jpg",
    isLink: true,
    link: "/category/smart-phones",
    caption: "<Link to='/smart-phones'>SHOP NOW</Link>",
  },
  {
    image: "/images/slide_summer_sale.webp",
    caption: "",
  },
];

const HeroSection = () => {
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
        slideImageFit="contain"
        slideBackgroundColor="pink"
      />
    </>
  );
};

export default HeroSection;
