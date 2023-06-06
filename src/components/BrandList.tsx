import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { brandState, getBrands } from "../features/brand/brandSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BrandList = () => {
  const dispatch: any = useDispatch();
  const brandState = useSelector<RootState, brandState>((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandArr = Object.values(brandState.brands).map((value) => value);

  const brandList = brandArr.map((brand, i) => {
    return (
      <Link to={`/brand/${brand.slug}`} key={i}>
        <div className="h-24 p-2 mx-8 overflow-hidden border w-36">
          <img
            className="object-contain w-full h-full p-1 hover:bg-neutral-100 hover:scale-110"
            src={brand.imageUrl}
            alt={brand.title}
          />
        </div>
      </Link>
    );
  });

  return (
    <div className="p-2 mx-2 bg-gray-50 rounded-xl">
      <h2 className="pb-4 text-center text-gray-400"> Supported Brands </h2>
      <Marquee speed={20}>{brandList}</Marquee>
    </div>
  );
};

export default BrandList;
