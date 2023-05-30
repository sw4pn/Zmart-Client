import { FC, useRef, useState } from "react";
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
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  children?: string;
  isSelected?: boolean;
  onChange?: () => void;
}

const ColorCheckbox: FC<Props> = (props) => {
  const { id, label, className } = props;

  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isSelected = state.isSelected && !props.isIndeterminate;

  const checkboxClassName = ` w-6 h-6 rounded-full ${
    isSelected
      ? "border-2 border-gray-700 border-spacing-4  bg-opacity-40 "
      : "border border-neutral-400"
  }  `;

  const labelClassName = ` select-none ${
    props.isDisabled
      ? "text-gray-400"
      : "text-gray-700 group-active:text-gray-800"
  }`;

  return (
    <>
      <div className={`flex items-center  py-1 ${className} `}>
        <VisuallyHidden>
          <input
            aria-label={label}
            id={id}
            {...mergeProps(inputProps, focusProps)}
            ref={ref}
          />
        </VisuallyHidden>
        <label htmlFor={id} className="flex items-center cursor-pointer group">
          <div
            className={checkboxClassName}
            style={{ backgroundColor: props.children }}
            aria-hidden="true">
            <svg
              className="w-full h-full p-1 stroke-current "
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
            </svg>
          </div>
        </label>
      </div>
    </>
  );
};

export default ColorCheckbox;
