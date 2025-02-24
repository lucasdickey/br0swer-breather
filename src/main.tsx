import React from "react";
import ReactDOM from "react-dom/client";
import { BreathingController } from "./components/BreathingController";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BreathingController />
  </React.StrictMode>
);
