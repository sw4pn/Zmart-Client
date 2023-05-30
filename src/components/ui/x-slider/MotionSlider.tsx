import Item from "./Item";
import { SliderContextProvider } from "./SliderContext";
import Track from "./Track";
import { ReactNode } from "react";

interface MotionSliderProps {
  children: ReactNode[];
  padding?: number;
  gap?: number;
  velocity?: number;
  transition?: { type: string; damping: number };
}

const MotionSlider = ({
  children,
  padding = 40,
  gap = 40,
  velocity = 0.4,
  transition = { type: "spring", damping: 500 },
}: MotionSliderProps) => {
  return (
    <SliderContextProvider>
      <Track padding={padding} velocity={velocity} transition={transition}>
        {children.map((child, i) => (
          <Item key={i} gap={gap} padding={padding}>
            {child}
          </Item>
        ))}
      </Track>
    </SliderContextProvider>
  );
};

export default MotionSlider;
