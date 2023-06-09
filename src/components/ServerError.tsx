const ServerError = () => {
  return (
    <div className="fixed w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div
        className=" bg-center h-[400px] w-full flex flex-col justify-between items-start "
        style={{
          backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
        }}>
        <div className="flex justify-center w-full text-xl leading-10 text-neutral-600">
          Error connecting to the server.
          <br />
          Please refresh and try again.
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

export default ServerError;
