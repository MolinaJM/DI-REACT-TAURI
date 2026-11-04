import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // No se ponen llaves porque App se exportó con default (10_Miscelanea.md)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);