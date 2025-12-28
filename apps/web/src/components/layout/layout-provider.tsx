import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren, type ReactNode } from "react";

type LayoutContextType = {
  headerTitle: string;
  headerActions: ReactNode | null;
  showRightAside: boolean;
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: ReactNode | null) => void;
  setShowRightAside: (show: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const [headerActions, setHeaderActions] = useState<ReactNode | null>(null);
  const [showRightAside, setShowRightAside] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        headerTitle,
        headerActions,
        showRightAside,
        setHeaderTitle,
        setHeaderActions,
        setShowRightAside,
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

// Hook to set layout config from pages
// eslint-disable-next-line -- exception
export function useLayoutConfig(config: { title?: string; actions?: ReactNode; showRightAside?: boolean }) {
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
      setHeaderTitle("Dashboard");
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
