import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import React from "react";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}