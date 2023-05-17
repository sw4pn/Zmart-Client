import Button from "./ui/Button";

const ServerError = () => {
  return (
    <div className="fixed w-full  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className=" bg-center h-[400px] w-full flex flex-col justify-between items-start "
        style={{
          backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
        }}>
        <div className="text-xl  w-full  flex justify-center leading-10 text-neutral-600">
          Error connecting to the server.
          <br />
          Please refresh and try again.
        </div>
        <div className="  w-full flex justify-center mt-10  ">
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

// <div className="fixed top-1/2 left-1/2">Server Error.</div>

export default ServerError;

// .loader::after {
//   animation-delay: 1s;
// }
