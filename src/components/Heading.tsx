const Heading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2 className={`p-4 mb-2 text-2xl font-semibold ${className}`}>{title}</h2>
  );
};

export default Heading;
