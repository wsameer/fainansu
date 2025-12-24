import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

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
  const [headerTitle, setHeaderTitle] = useState("ExpenseHub");
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
