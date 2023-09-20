import { create } from "zustand";

interface SidebarState {
  isSiderbarOpen: boolean;
  inputValues: any;
  type: string;
  setIsSidebarOpen: (isSiderbarOpen: boolean) => void;
  setType: (type: string) => void;
  setInputValues: (inputValues: any) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isSiderbarOpen: false,
  inputValues: {},
  type: "",
  setIsSidebarOpen: (isSiderbarOpen) =>
    set((state) => ({ isSiderbarOpen: isSiderbarOpen })),
  setType: (type) => set((state) => ({ type: type })),
  setInputValues: (inputValues) =>
    set((state) => ({ inputValues: { ...inputValues } })),
}));
