import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { XIcon } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import { Button } from "@workspace/ui/components/button";

import { useIsMobile } from "@/hooks/use-mobile";
import { SettingsNavigation } from "../settings-navigation";

const SETTINGS_RETURN_PATH_KEY = "settings-return-path";

type SettingsModalProps = {
  children: React.ReactNode;
};

export function SettingsModal({ children }: SettingsModalProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // On mount, check if we need to store the return path
  useEffect(() => {
    // If there's no stored return path, we're entering settings fresh
    // The return path should have been set by the navigation trigger
    // If not set (direct URL access), default to "/"
    if (!sessionStorage.getItem(SETTINGS_RETURN_PATH_KEY)) {
      sessionStorage.setItem(SETTINGS_RETURN_PATH_KEY, "/");
    }

    // Cleanup when component unmounts (navigating away from settings entirely)
    return () => {
      // Only clear if we're navigating away from settings
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/settings")) {
        sessionStorage.removeItem(SETTINGS_RETURN_PATH_KEY);
      }
    };
  }, []);

  const handleClose = () => {
    const returnPath = sessionStorage.getItem(SETTINGS_RETURN_PATH_KEY) || "/";
    sessionStorage.removeItem(SETTINGS_RETURN_PATH_KEY);
    navigate({ to: returnPath });
  };

  // Mobile: Full-screen drawer from bottom
  if (isMobile) {
    return (
      <Drawer open direction="bottom" onOpenChange={(open) => !open && handleClose()}>
        <DrawerContent className="h-full data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh]">
          <DrawerHeader className="border-b ">
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">{children}</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Centered dialog with sidebar navigation
  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="max-w-4xl! w-full h-[80vh] p-0 gap-0 flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="border-b px-6 py-4 flex-row items-center justify-between shrink-0">
          <DialogTitle className="text-base">Settings</DialogTitle>
          <Button variant="ghost" size="icon-sm" onClick={handleClose}>
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-1/5 p-2 overflow-y-auto shrink-0">
            <SettingsNavigation />
          </div>
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
