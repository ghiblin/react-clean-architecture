import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "../tic-tac-toe/home";
import { DependencyContextProvider } from "./dependency-context-provider";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function bootstrap() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <DependencyContextProvider>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </DependencyContextProvider>
    </StrictMode>
  );
}
