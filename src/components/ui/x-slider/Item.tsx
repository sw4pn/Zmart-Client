import { FC, ReactNode, useContext, useEffect } from "react";
import { SliderContext } from "./SliderContext";
import useDimensions from "../../../hooks/use-dimensions/useDimensions";
import { DimensionObject } from "../../../hooks/use-dimensions/types";

type ItemProps = {
  children: ReactNode;
  gap?: number;
  padding: number;
};

const Item: FC<ItemProps> = ({ children, gap, padding }) => {
  const { dispatch } = useContext(SliderContext) ?? {};
  //   const [itemRef, { x }] = useDimensions();
  const [itemRef, dimensions] = useDimensions();
  const { x } = dimensions as DimensionObject;

  useEffect(() => {
    if (dispatch) {
      x && dispatch({ type: "ADD_ITEM", item: x - padding });
    }
  }, [x]);
  return (
    <div className="flex-[0_0_auto]" style={{}} ref={itemRef}>
      {/* &:not(:last-child) gap px */}
      {children}
    </div>
  );
};

export default Item;
