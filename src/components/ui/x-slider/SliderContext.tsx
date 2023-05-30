import { createContext, useReducer, ReactNode } from "react";

interface SliderState {
  items: any[]; // Adjust the type according to the items in your state
  activeItem: number | undefined;
}

interface sliderAction {
  type: string;
  item?: any;
  activeItem?: number;
}

interface SliderContextType {
  state: SliderState;
  dispatch: React.Dispatch<sliderAction>;
}

export const SliderContext = createContext<SliderContextType | null>(null);

export const SliderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const ADD_ITEM = "ADD_ITEM";
  const SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM";

  const initialState: SliderState = {
    items: [],
    activeItem: 0,
  };

  function reducer(state: SliderState, action: sliderAction) {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          items: [...state.items, action.item],
        };

      case SET_ACTIVE_ITEM:
        return {
          ...state,
          activeItem: action.activeItem,
        };

      default:
        return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SliderContext.Provider value={{ state, dispatch }}>
      {children}
    </SliderContext.Provider>
  );
};
