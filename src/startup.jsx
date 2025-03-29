import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";

import App from "./components/Calculator";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);