import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { WritableDraft } from "immer";

export type LayoutState = {
  headerTitle: string;
  headerActions: React.ReactNode | null;

  leftSidebarContent: React.ReactNode | null;
  rightSidebarContent: React.ReactNode | null;

  showLeftSidebar: boolean;
  showRightSidebar: boolean;
};

export type LayoutActions = {
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: React.ReactNode | null) => void;

  setLeftSidebarContent: (content: React.ReactNode | null) => void;
  setRightSidebarContent: (content: React.ReactNode | null) => void;

  setShowLeftSidebar: (show: boolean) => void;
  setShowRightSidebar: (show: boolean) => void;

  resetLayout: () => void;
};

export type LayoutStore = LayoutState & LayoutActions;

export const useLayoutStore = create<LayoutStore>()(
  immer(
    devtools(
      (set) => ({
        headerTitle: "Dashboard",
        headerActions: null,
        leftSidebarContent: null,
        rightSidebarContent: null,
        showLeftSidebar: true,
        showRightSidebar: true,

        setHeaderTitle: (title: string) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.headerTitle = title;
          });
        },

        setHeaderActions: (actions: React.ReactNode | null) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.headerActions = actions;
          });
        },

        setLeftSidebarContent: (content: React.ReactNode | null) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.leftSidebarContent = content;
          });
        },

        setRightSidebarContent: (content: React.ReactNode | null) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.rightSidebarContent = content;
          });
        },

        setShowLeftSidebar: (show: boolean) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.showLeftSidebar = show;
          });
        },

        setShowRightSidebar: (show: boolean) => {
          set((state: WritableDraft<LayoutStore>) => {
            state.showRightSidebar = show;
          });
        },

        resetLayout: () => {
          set((state: WritableDraft<LayoutStore>) => {
            state.headerTitle = "Dashboard";
            state.headerActions = null;
            state.leftSidebarContent = null;
            state.rightSidebarContent = null;
            state.showLeftSidebar = true;
            state.showRightSidebar = true;
          });
        },
      }),
      { name: "layout-store" }
    )
  )
);
