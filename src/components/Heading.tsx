const Heading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={`px-4 py-2 mb-4 text-2xl font-semibold font-rubik ${className}`}>
      {title}
    </h2>
  );
};

export default Heading;
