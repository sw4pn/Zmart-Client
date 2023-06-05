import BigCards from "../components/BigCards";
import BrandList from "../components/BrandList";
import CategoryList from "../components/CategoryList";
import FeaturedList from "../components/FeaturedList";
import FeaturesList from "../components/FeaturesList";
import Heading from "../components/Heading";
import HeroSection from "../components/HeroSection";
import PopularList from "../components/PopularList";
import SpecialList from "../components/SpecialList";
import ThreeBanners from "../components/ThreeBanners";
import Spacer from "../components/helpers/Spacer";
import Container from "../components/layouts/Container";

const Home = () => {
  return (
    <>
      <Container className="">
        {/* Hero Section */}
        <div className="">
          <HeroSection />
        </div>

        {/* Three Banners */}
        {/* <div className="flex items-center justify-center py-10 ">
          <ThreeBanners />
        </div> */}
        {/* Featured Categories */}
        <div className="flex items-center justify-center py-10 ">
          <CategoryList />
        </div>
        {/* Features */}
        <div className="py-10 bg-neutral-100">
          <FeaturesList />
        </div>
        {/* Special Products */}
        <div className="py-10">
          <Heading title="Special  Products" className="text-center" />
          <SpecialList />
        </div>
        {/* BigCards */}
        <div className="py-10">
          <BigCards />
        </div>
        {/* Featured Products */}
        {/* <div className="py-10">
          <FeaturedList />
        </div> */}
        {/* Brands */}
        <div className="py-10 bg-neutral-100">
          <BrandList />
        </div>
        {/* Popular Products */}
        <div className="py-10 bg-neutral-100">
          <Heading title="Popular Products" />
          <PopularList />
        </div>
      </Container>
      <Spacer size={150} className="bg-neutral-100" />
    </>
  );
};

export default Home;
