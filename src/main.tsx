// import { StrictMode } from "react";
import { CalendarApp } from "./CalendarApp.tsx";
import { createRoot } from "react-dom/client";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <CalendarApp />,
  // </StrictMode>,
);
