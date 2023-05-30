import { useSelector } from "react-redux";
import { selectAuthUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const AccountDetails = () => {
  const user = useSelector(selectAuthUser);

  const thumb = user?.avatar?.url
    ? user.avatar?.url
    : "/images/user-profile.png";

  return (
    <>
      <div className="flex justify-start items-center gap-4">
        <img src={thumb} alt="profile" className="w-24 h-24" />
        <div className="">
          <span className="capitalize block my-2">
            {user?.firstName + " " + user?.lastName}
          </span>
          <span className="block mb-4">{user?.email}</span>

          <span className="block">
            {user?.role === "admin" && (
              <p className="border py-0.5 px-2 mx-2 inline">Admin</p>
            )}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="">
          <p className="text-gray-900 inline-block mr-3"> Wishlist: </p>
          {user?.wishlist ? user.wishlist?.length : 0} products
        </div>
        <div className="">
          <p className="text-gray-900 inline-block mr-3"> Cart: </p>
          {user.cart ? user.cart?.products?.length : 0} products
        </div>
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold">Address:</h2>
        <div className="p-4">
          {user?.address ? (
            <address className="py-2">
              {user?.address?.address}
              <span className="py-2 block">
                {user.address.city}, {user.address.postCode}
              </span>
              <span className="py-2 block">
                {user.address.state}, {user.address.country}
              </span>
            </address>
          ) : (
            <>
              Address not available, Please
              <Link
                to="/my-account/edit"
                className="text-green-600 hover:underline px-2">
                Add
              </Link>
              your address.
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
