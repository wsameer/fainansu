import { useEffect, useRef } from "react";
import { useLayoutStore } from "@/stores";

type LayoutConfig = {
  title?: string;
  actions?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
};

export function useLayoutConfig(config: LayoutConfig) {
  const {
    setHeaderTitle,
    setHeaderActions,
    setLeftSidebarContent,
    setRightSidebarContent,
    setShowLeftSidebar,
    setShowRightSidebar,
    resetLayout,
  } = useLayoutStore();

  const isInitialMount = useRef(true);

  useEffect(() => {
    // Set initial config
    if (config.title !== undefined) setHeaderTitle(config.title);
    if (config.actions !== undefined) setHeaderActions(config.actions);
    if (config.leftSidebar !== undefined) setLeftSidebarContent(config.leftSidebar);
    if (config.rightSidebar !== undefined) setRightSidebarContent(config.rightSidebar);
    if (config.showLeftSidebar !== undefined) setShowLeftSidebar(config.showLeftSidebar);
    if (config.showRightSidebar !== undefined) setShowRightSidebar(config.showRightSidebar);

    isInitialMount.current = false;

    // Cleanup on unmount - reset to defaults
    return () => {
      resetLayout();
    };
  }, [
    setHeaderTitle,
    setHeaderActions,
    setLeftSidebarContent,
    setRightSidebarContent,
    setShowLeftSidebar,
    setShowRightSidebar,
    resetLayout,
    config.title,
    config.actions,
    config.leftSidebar,
    config.rightSidebar,
    config.showLeftSidebar,
    config.showRightSidebar,
  ]);
}
