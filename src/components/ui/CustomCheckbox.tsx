import { FC, useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

interface Props {
  id: string;
  label?: string;
  name?: string;
  className?: string;
  size?: string;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  children?: string;
  isSelected?: boolean;
  onChange?: () => void;
}

const CustomCheckbox: FC<Props> = (props) => {
  const { id, label, className, children, size } = props;

  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  const checkboxClassName = ` text-white border-2 rounded  flex flex-shrink-0 justify-center items-center mr-2 transition ease-in-out duration-150
  ${size === "small" ? "w-4 h-4" : "w-5 h-5"}
  ${isSelected ? "bg-indigo-500 group-active:bg-indigo-600" : "bg-white"} 

  ${
    props.isDisabled
      ? "border-gray-300"
      : isFocusVisible || isSelected
      ? "border-indigo-500 group-active:border-indigo-600"
      : "border-gray-500 group-active:border-gray-600"
  }
  
  ${isFocusVisible ? "shadow-outline" : ""} `;

  const labelClassName = ` select-none ${
    props.isDisabled
      ? "text-gray-400"
      : "text-gray-700 group-active:text-gray-800"
  }`;

  return (
    <>
      <div className={`flex items-center  my-2 py-1 ${className} `}>
        <VisuallyHidden>
          <input id={id} {...mergeProps(inputProps, focusProps)} ref={ref} />
        </VisuallyHidden>
        <label
          htmlFor={id}
          className="flex items-center pr-6 cursor-pointer group">
          <div className={checkboxClassName} aria-hidden="true">
            <svg
              className="w-3 h-3 stroke-current "
              viewBox="0 0 18 18"
              aria-hidden="true">
              <polyline
                points="1 9 7 14 15 4"
                fill="none"
                strokeWidth={3}
                strokeDasharray={22}
                strokeDashoffset={isSelected ? 44 : 66}
                style={{
                  transition: "all 400ms",
                }}
              />
              {props.isIndeterminate && (
                <rect x={2} y={7} width={16} height={5} fill="gray" />
              )}
            </svg>
          </div>
          <span className={labelClassName}>{children}</span>
        </label>
        {/* <label htmlFor="check"></label> */}
      </div>
    </>
  );
};

export default CustomCheckbox;
