import useDimensions from "../../../hooks/use-dimensions/useDimensions";
import { PanInfo, motion, useAnimation } from "framer-motion";
import useWindowSize, {
  windowSizeType,
} from "../../../hooks/use-window-size/useWindowSIze";
import { useContext, ReactNode } from "react";
import { SliderContext } from "./SliderContext";

interface TrackProps {
  children: ReactNode;
  padding: number;
  velocity: number;
  transition: { type: string; damping: number };
}

const Track = ({ children, padding, velocity, transition }: TrackProps) => {
  const [trackRef, trackDimensions] = useDimensions();
  const windowDimensions: windowSizeType = useWindowSize();
  const controls = useAnimation();

  const { state, dispatch } = useContext(SliderContext) ?? {};

  const negativeItems = state
    ? state.items.map((item) => item * -1 + trackDimensions.x || 0)
    : [];

  function onDragEnd(event: MouseEvent | TouchEvent, info: PanInfo) {
    const offset = info.offset.x;
    const correctedVelocity = info.velocity.x * velocity;

    const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
    const startPosition = info.point.x - offset;

    const endOffset =
      direction === 1
        ? Math.min(correctedVelocity, offset)
        : Math.max(correctedVelocity, offset);
    const endPosition = startPosition + endOffset;

    const closestPosition = negativeItems.reduce((prev: number, curr: number) =>
      Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    );

    const activeSlide = negativeItems.indexOf(closestPosition);
    if (dispatch)
      dispatch({ type: "SET_ACTIVE_ITEM", activeItem: activeSlide });

    controls.start({
      x: Math.max(
        closestPosition,
        windowDimensions.innerWidth -
          trackDimensions.width -
          trackDimensions.x || 0
      ),
      transition,
    });
  }

  return (
    <div className="w-full">
      <motion.div
        className="flex min-w-min flex-nowrap cursor-grab active:cursor-grabbing"
        style={{
          padding: `${padding}px`,
        }}
        ref={trackRef}
        animate={controls}
        drag="x"
        dragConstraints={{
          left:
            windowDimensions.innerWidth -
            trackDimensions.width -
            trackDimensions.x,

          right: 0 + trackDimensions.x,
        }}
        onDragEnd={onDragEnd}>
        {children}
      </motion.div>
    </div>
  );
};

export default Track;
