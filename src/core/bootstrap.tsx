import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "../tic-tac-toe/home";
import { DependencyContextProvider } from "./dependency-context-provider";
import "./index.css";

export function bootstrap() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <DependencyContextProvider>
        <Home />
      </DependencyContextProvider>
    </StrictMode>
  );
}
