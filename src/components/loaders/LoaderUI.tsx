const LoaderUI = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative inline-block w-12 h-12">
        <span className="absolute content-[''] w-16 h-16 rounded-full animate-puff bg-black"></span>
        <span
          className="absolute content-[''] w-16 h-16 rounded-full left-0 top-0 bg-orange-600 animate-puff"
          style={{
            animationDelay: `1s`,
          }}></span>
      </div>
    </div>
  );
};

export default LoaderUI;
