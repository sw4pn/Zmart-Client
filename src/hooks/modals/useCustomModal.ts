import { create } from "zustand";

interface CustomModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCustomModal = create<CustomModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCustomModal;
