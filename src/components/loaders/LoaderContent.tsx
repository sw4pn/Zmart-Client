const LoaderContent = () => {
  return (
    <div
      className="w-full h-full m-2 text-transparent bg-neutral-200 animate-loading"
      style={{
        background: `linear-gradient(100deg, #e4e4e4 30%, #f6f7f8 50%, #e4e4e4 70%)`,
        // background: `linear-gradient(100deg, #d6dadd 30%, #f6f7f8 50%, #eceff1 70%)`,
        backgroundSize: `400%`,
      }}
    />
  );
};

export default LoaderContent;
