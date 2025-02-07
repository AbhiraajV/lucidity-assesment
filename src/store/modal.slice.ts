// useModalStore.ts

import { create } from "zustand";
export type ModalType = "edit-product"
interface ModalStore {
  currentModal: ModalType | null;
  openModal: (modalType: "edit-product") => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: null,
  openModal: (modalType: ModalType) => set({ currentModal: modalType }),
  closeModal: () => set({ currentModal: null }),
}));
