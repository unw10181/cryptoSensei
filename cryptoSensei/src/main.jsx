import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

import { Toaster } from "react-hot-toast";
import "./index.css";

function Boot() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 80,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      <App />
      <Toaster position="top-right" />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
);
