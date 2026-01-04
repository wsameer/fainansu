import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { WritableDraft } from "immer";

export interface ModalState {
  id: string;
  isOpen: boolean;
  component?: string; // Component name to render
  props?: Record<string, unknown>;
}

export interface UiState {
  // Loading states
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;

  // Modals
  modals: ModalState[];

  // Sidebar/Drawer states
  sidebarOpen: boolean;

  // Actions
  setGlobalLoading: (loading: boolean) => void;
  setLoading: (key: string, loading: boolean) => void;
  removeLoading: (key: string) => void;

  openModal: (modal: Omit<ModalState, "isOpen">) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()(
  immer(
    devtools(
      (set) => ({
        // Initial state
        globalLoading: false,
        loadingStates: {},
        modals: [],
        sidebarOpen: false,

        // Loading actions
        setGlobalLoading: (loading: boolean) => {
          set((state: WritableDraft<UiState>) => {
            state.globalLoading = loading;
          });
        },

        setLoading: (key: string, loading: boolean) => {
          set((state: WritableDraft<UiState>) => {
            if (loading) {
              state.loadingStates[key] = true;
            } else {
              delete state.loadingStates[key];
            }
          });
        },

        removeLoading: (key: string) => {
          set((state: WritableDraft<UiState>) => {
            delete state.loadingStates[key];
          });
        },

        // Modal actions
        openModal: (modal: Omit<ModalState, "isOpen">) => {
          set((state: WritableDraft<UiState>) => {
            const existingIndex = state.modals.findIndex((m: ModalState) => m.id === modal.id);
            if (existingIndex >= 0) {
              state.modals[existingIndex] = { ...modal, isOpen: true };
            } else {
              state.modals.push({ ...modal, isOpen: true });
            }
          });
        },

        closeModal: (id: string) => {
          set((state: WritableDraft<UiState>) => {
            const modal = state.modals.find((m: ModalState) => m.id === id);
            if (modal) {
              modal.isOpen = false;
            }
          });
        },

        closeAllModals: () => {
          set((state: WritableDraft<UiState>) => {
            state.modals.forEach((modal: ModalState) => {
              modal.isOpen = false;
            });
          });
        },

        // Sidebar actions
        toggleSidebar: () => {
          set((state: WritableDraft<UiState>) => {
            state.sidebarOpen = !state.sidebarOpen;
          });
        },

        setSidebarOpen: (open: boolean) => {
          set((state: WritableDraft<UiState>) => {
            state.sidebarOpen = open;
          });
        },
      }),
      { name: "ui-store" }
    )
  )
);
