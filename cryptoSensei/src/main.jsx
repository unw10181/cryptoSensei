import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Aos from "aos";

// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
  offset: 100,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
