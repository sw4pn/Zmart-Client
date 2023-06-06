const LoaderRing = ({ size = 48 }: { size?: number }) => {
  return (
    <div
      className="inline-block border-4 rounded-full border-y-white/90 border-x-transparent animate-rotate"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default LoaderRing;
