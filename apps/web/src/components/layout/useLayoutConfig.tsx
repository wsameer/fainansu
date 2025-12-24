import { useEffect, useRef, type ReactNode } from "react";
import { useLayout } from "./layout-provider";

// Hook to set layout config from pages
export function useLayoutConfig(config: {
  title?: string;
  actions?: ReactNode;
  showRightAside?: boolean;
}) {
  const { setHeaderTitle, setHeaderActions, setShowRightAside } = useLayout();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Set initial config
    if (config.title !== undefined) {
      setHeaderTitle(config.title);
    }
    if (config.actions !== undefined) {
      setHeaderActions(config.actions);
    }
    if (config.showRightAside !== undefined) {
      setShowRightAside(config.showRightAside);
    }

    isInitialMount.current = false;

    // Cleanup on unmount
    return () => {
      setHeaderTitle("ExpenseHub");
      setHeaderActions(null);
      setShowRightAside(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialMount.current && config.title !== undefined) {
      setHeaderTitle(config.title);
    }
  }, [config.title, setHeaderTitle]);

  useEffect(() => {
    if (!isInitialMount.current && config.showRightAside !== undefined) {
      setShowRightAside(config.showRightAside);
    }
  }, [config.showRightAside, setShowRightAside]);
}
