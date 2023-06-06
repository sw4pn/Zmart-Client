import { useDispatch, useSelector } from "react-redux";
import HeadTitle from "../components/HeadTitle";
import Container from "../components/layouts/Container";
import {
  loadUser,
  selectWishlist,
  toggleWishlist,
} from "../features/auth/authSlice";
import ProductMini from "../components/ProductMini";
import { useState, useEffect } from "react";

const WishlistPage = () => {
  const dispatch: any = useDispatch();
  const [reload, setReload] = useState(false);
  const wishlist = useSelector(selectWishlist);

  const total = wishlist && wishlist?.length > 0 ? wishlist?.length : 0;

  const removeFromWishlist = (id: string) => {
    dispatch(toggleWishlist({ productId: id })).then(() => setReload(true));
  };

  useEffect(() => {
    if (reload) {
      dispatch(loadUser());
      setReload(false);
    }
  }, [reload, dispatch]);

  return (
    <Container className="p-4 sm:p-10">
      <HeadTitle title="Wishlist" className="pt-4 pb-10" />
      <div className="flex flex-wrap justify-center gap-6 py-10 lg:gap-10">
        {total > 0 ? (
          wishlist?.map((product, index) => (
            <ProductMini
              key={index}
              product={product}
              onClose={() => removeFromWishlist(product._id)}
            />
          ))
        ) : (
          <>No products in your wishlist.</>
        )}
      </div>
    </Container>
  );
};

export default WishlistPage;
