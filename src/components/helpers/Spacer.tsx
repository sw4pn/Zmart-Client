const Spacer = ({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) => {
  return (
    <div
      style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
      className={className}
    />
  );
};

export default Spacer;
