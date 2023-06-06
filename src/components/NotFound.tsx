import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="fixed w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div
        className=" bg-center h-[400px] w-full flex flex-col justify-between items-start "
        style={{
          backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
        }}>
        <div className="flex justify-center w-full text-xl font-bold leading-10 text-neutral-600">
          <div className="block py-2 text-center">
            <div className="py-4 text-4xl">Not Found </div>
            Get back to
            <Link
              to="/"
              className="px-1 mx-2 text-orange-400 border-b-2 border-orange-400 hover:opacity-70">
              HOME
            </Link>
            page.
          </div>
        </div>
        <div className="flex justify-center w-full mt-10 ">
          <img
            src="/images/zmart-logo.png"
            alt="logo"
            className="w-40 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
