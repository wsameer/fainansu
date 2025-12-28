import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren, type ReactNode } from "react";

type LayoutContextType = {
  headerTitle: string;
  headerActions: ReactNode | null;

  leftSidebarContent: ReactNode | null;
  rightSidebarContent: ReactNode | null;

  showLeftSidebar: boolean;
  showRightSidebar: boolean;

  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: ReactNode | null) => void;

  setLeftSidebarContent: (content: ReactNode | null) => void;
  setRightSidebarContent: (content: ReactNode | null) => void;

  setShowLeftSidebar: (show: boolean) => void;
  setShowRightSidebar: (show: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const [headerActions, setHeaderActions] = useState<ReactNode | null>(null);
  const [leftSidebarContent, setLeftSidebarContent] = useState<ReactNode | null>(null);
  const [rightSidebarContent, setRightSidebarContent] = useState<ReactNode | null>(null);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        headerTitle,
        headerActions,
        leftSidebarContent,
        rightSidebarContent,
        showLeftSidebar,
        showRightSidebar,
        setHeaderTitle,
        setHeaderActions,
        setLeftSidebarContent,
        setRightSidebarContent,
        setShowLeftSidebar,
        setShowRightSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

// eslint-disable-next-line -- exception
export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

type LayoutConfig = {
  title?: string;
  actions?: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
};

// Hook to set layout config from pages
// eslint-disable-next-line -- exception
export function useLayoutConfig(config: LayoutConfig) {
  const {
    setHeaderTitle,
    setHeaderActions,
    setLeftSidebarContent,
    setRightSidebarContent,
    setShowLeftSidebar,
    setShowRightSidebar,
  } = useLayout();

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
      setHeaderTitle("Dashboard");
      setHeaderActions(null);
      setLeftSidebarContent(null);
      setRightSidebarContent(null);
      setShowLeftSidebar(true);
      setShowRightSidebar(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update on config changes
  useEffect(() => {
    if (!isInitialMount.current && config.title !== undefined) {
      setHeaderTitle(config.title);
    }
  }, [config.title, setHeaderTitle]);

  useEffect(() => {
    if (!isInitialMount.current && config.leftSidebar !== undefined) {
      setLeftSidebarContent(config.leftSidebar);
    }
  }, [config.leftSidebar, setLeftSidebarContent]);

  useEffect(() => {
    if (!isInitialMount.current && config.rightSidebar !== undefined) {
      setRightSidebarContent(config.rightSidebar);
    }
  }, [config.rightSidebar, setRightSidebarContent]);

  useEffect(() => {
    if (!isInitialMount.current && config.showLeftSidebar !== undefined) {
      setShowLeftSidebar(config.showLeftSidebar);
    }
  }, [config.showLeftSidebar, setShowLeftSidebar]);

  useEffect(() => {
    if (!isInitialMount.current && config.showRightSidebar !== undefined) {
      setShowRightSidebar(config.showRightSidebar);
    }
  }, [config.showRightSidebar, setShowRightSidebar]);
}
