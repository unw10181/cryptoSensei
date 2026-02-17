import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/layout/Navbar";

// Pages (to be created)
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolios from "./pages/Portfolios";
import PortfolioDetail from "./pages/PortfolioDetail";
import Crypto from "./pages/Crypto";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return <></>;
}

export default App;
