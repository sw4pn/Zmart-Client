import Feature from "./Feature";

const mainFeatures = [
  {
    img: "service.png",
    title: "Free Shipping",
    info: "From all orders over ₹500",
  },
  {
    img: "service-02.png",
    title: "Daily Surprise Offers",
    info: "Save up to 25% off",
  },
  {
    img: "service-03.png",
    title: "Support 24/7",
    info: "Ship with an expert",
  },
  {
    img: "service-04.png",
    title: "Affordable Prices",
    info: "Get Factory direct prices",
  },
  {
    img: "service-05.png",
    title: "Secure Payments",
    info: "100% Protected Payments",
  },
];

const FeaturesList = () => {
  const features = mainFeatures.map((feature, i) => {
    return (
      <Feature
        img={feature.img}
        title={feature.title}
        info={feature.info}
        key={i}
      />
    );
  });
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {/* <div className="grid grid-cols-2 gap-2 px-1 mx-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:px-3 md:mx-2 sm:gap-4 sm:place-items-center lg:max-w-screen-2xl lg:mx-auto "> */}
      {features}
    </div>
  );
};

export default FeaturesList;
