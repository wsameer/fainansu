import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { Button } from "@workspace/ui/components/button.tsx";
import { ArrowUpIcon } from "lucide-react";

function App() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
      </div>
      <PWABadge />
    </>
  );
}

export default App;
