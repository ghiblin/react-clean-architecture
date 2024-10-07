import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../tic-tac-toe/app";
import "./index.css";

export function bootstrap() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
