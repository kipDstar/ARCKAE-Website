import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/routes.tsx"; // Import the router we looked at earlier
import "./styles/index.css";
import React from "react";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}