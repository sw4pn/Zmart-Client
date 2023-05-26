import {
  MutableRefObject,
  createContext,
  FC,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Items, Transition } from "../../../types";
import { useContext } from "react";
import { AccordionContext } from "./Accordion";

interface AccordionItemStore {
  accordionRef: MutableRefObject<null> | null;
  active: boolean;
  items: Items;
  hash: string;
  toggle: () => void;
  transition?: Transition | null;
  alwaysOpen?: boolean;
  isActive?: boolean;
}

export const AccordionItemContext = createContext<AccordionItemStore>({
  accordionRef: null,
  active: false,
  items: {},
  hash: "",
  transition: null,
  alwaysOpen: false,
  toggle: () => {
    //
  },
  isActive: false,
});

export interface Props {
  children: JSX.Element | JSX.Element[];
  //    | Function;
  className?: string;
  isActive?: boolean;
}

const AccordionItem: FC<Props> = ({
  children,
  isActive = false,
  className = "",
}) => {
  const { accordionRef, items, setItems, transition, alwaysOpen } =
    useContext(AccordionContext);
  const [active, setActive] = useState<boolean>(false);

  const hash = useMemo(() => {
    return Math.random().toString(36).substring(2, 9);
  }, []);

  useEffect(() => {
    if (!(hash in items)) {
      setItems({ ...items, [hash]: setActive });
    }
  }, [items]);

  const value = useMemo(() => {
    return {
      accordionRef,
      active,
      toggle: () => setActive(!active),
      items,
      hash,
      transition,
      alwaysOpen,
      isActive,
    };
  }, [accordionRef, active, alwaysOpen, hash, items, isActive, transition]);

  return (
    <AccordionItemContext.Provider value={value}>
      <div className={`${className}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
