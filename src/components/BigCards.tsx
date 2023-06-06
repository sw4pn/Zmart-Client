import BigCard from "./BigCard";

const data = [
  {
    image: "/images/big_laptop.jpg",
    isLink: true,
    link: "/product/macbook-pro-16",
    dark: true,
    isText: true,
    text: {
      category: "laptops",
      title: "MacBook Pro",
      text: "Supercharged by M2 Pro and M2 Max",
    },
  },
  {
    image: "/images/big_watch.jpg",
    isLink: true,
    dark: false,
    link: "/category/smart-watches",
    isText: true,
    text: {
      category: "Smartwatches",
      title: "Exclusive collection of Watches",
      text: "Pride is in the air",
    },
  },
  //   {
  //     image: "/images/big_ipad.jpg",
  //     isLink: true,
  //     dark: false,
  //     link: "/category/tablets",
  //     isText: true,
  //     text: {
  //       category: "tablets",
  //       title: "World on your screen",
  //       text: "Lovable. Drawable. Magical.",
  //     },
  //   },
  //   {
  //     image: "/images/big_laptop.jpg",
  //     isLink: true,
  //     link: "/category/smart-watches",
  //     isText: false,
  //     text: {
  //       category: "Smartwatches",
  //       title: "Exclusive collection of Watches",
  //       text: "Pride is in the air",
  //     },
  //   },
  {
    image: "/images/big_realme_watch.png",
    isLink: true,
    link: "/product/realme-watch-3-pro",
    isText: false,
    text: {},
  },
  {
    image: "/images/big_earbuds.webp",
    isLink: true,
    link: "/product/realme-buds-air-3s",
    isText: false,
    text: {},
  },
];

const BigCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {data.map((product, i) => (
        <BigCard key={i} product={product} />
      ))}
    </div>
  );
};

export default BigCards;
