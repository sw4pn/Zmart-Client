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
    dispatch(toggleWishlist(id)).then(() => setReload(true));
  };

  useEffect(() => {
    if (reload) {
      dispatch(loadUser());
      setReload(false);
    }
  }, [reload]);

  return (
    <Container className="p-4 sm:p-10">
      <HeadTitle title="Wishlist" className="pb-10 pt-4" />
      <div className="flex justify-center gap-6 lg:gap-10 flex-wrap py-10">
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
