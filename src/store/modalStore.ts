import { create } from 'zustand'

interface ModalStore {
  modalVisible: boolean
  toggleModal: () => void
  openModal: () => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modalVisible: false,
  toggleModal: () => set((state) => ({ modalVisible: !state.modalVisible })),
  openModal: () => set({ modalVisible: true }),
  closeModal: () => set({ modalVisible: false }),
}))
