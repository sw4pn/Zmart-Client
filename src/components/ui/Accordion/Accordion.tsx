import {
  FC,
  MutableRefObject,
  createContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Items, Transition } from "../../../types";

interface AccordionStore {
  accordionRef: MutableRefObject<null> | null;
  items: Items;
  setItems: (value: Items) => void;
  transition?: Transition | null;
  alwaysOpen?: boolean;
}

export const AccordionContext = createContext<AccordionStore>({
  accordionRef: null,
  items: {},
  setItems: () => {
    //
  },
  transition: null,
  alwaysOpen: false,
});

interface Props {
  children: JSX.Element | JSX.Element[];
  as?: string;
  transition?: Transition;
  alwaysOpen?: boolean;
  className?: string;
}

const Accordion: FC<Props> = ({
  children,
  as = "div",
  transition = undefined,
  alwaysOpen = false,
}) => {
  const accordionRef = useRef(null);
  const [items, setItems] = useState<Items>({});

  const TagName: any = useMemo(() => {
    if (as) {
      return as;
    }
    return "div";
  }, [as]);

  const value = useMemo(() => {
    return { accordionRef, items, setItems, transition, alwaysOpen };
  }, [alwaysOpen, items, transition]);

  return (
    <AccordionContext.Provider value={value}>
      <TagName className="">{children}</TagName>
    </AccordionContext.Provider>
  );
};

export default Accordion;
