import { create } from "zustand";

interface PromptModalState {
  isPromptModalOpen: boolean;
  promptModalHeading: string;
  setIsPromptModalOpen: (isPromptModalOpen: boolean) => void;
  setPromptModalHeading: (promptModalHeading: string) => void;
}

export const usePromptModalStore = create<PromptModalState>()((set) => ({
  isPromptModalOpen: false,
  promptModalHeading: "",
  setIsPromptModalOpen: (isPromptModalOpen) =>
    set((state) => ({ isPromptModalOpen: isPromptModalOpen })),
  setPromptModalHeading: (promptModalHeading) =>
    set((state) => ({ promptModalHeading: promptModalHeading })),
}));
