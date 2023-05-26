const ShortTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <h3 className={`uppercase border-b pb-2 ${className}`}>{title}</h3>;
};

export default ShortTitle;
