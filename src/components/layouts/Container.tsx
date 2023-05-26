import { ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`${className}`}>
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </div>
  );
};

export default Container;
