import { create } from "zustand";

interface ActionModalState {
  isActionModalOpen: boolean;
  actionModalHeading: string;
  setIsActionModalOpen: (isActionModalOpen: boolean) => void;
  setActionModalHeading: (actionModalHeading: string) => void;
}

export const useActionModalStore = create<ActionModalState>()((set) => ({
  isActionModalOpen: false,
  actionModalHeading: "",
  setIsActionModalOpen: (isActionModalOpen) =>
    set((state) => ({ isActionModalOpen: isActionModalOpen })),
  setActionModalHeading: (actionModalHeading) =>
    set((state) => ({ actionModalHeading: actionModalHeading })),
}));
