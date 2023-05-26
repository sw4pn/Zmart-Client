const HeadTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1 className={`text-4xl font-semibold font-rubik ${className}`}>
      {title}
    </h1>
  );
};

export default HeadTitle;
