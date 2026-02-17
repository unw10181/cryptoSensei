import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import LoadingScreen from "./components/common/LoadingScreen.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AvatarSelect from "./pages/AvatarSelect.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Portfolios from "./pages/Portfolios.jsx";
import PortfolioDetail from "./pages/PortfolioDetail.jsx";
import Crypto from "./pages/Crypto.jsx";
import Achievements from "./pages/Achievements.jsx";
import Profile from "./pages/Profile.jsx";

import "./App.css";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// If logged in but no avatar chosen, force them to select one
function AvatarGate({ children }) {
  const { user } = useAuth();
  if (user && !user.avatar) return <Navigate to="/avatar" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div className="particles-bg" aria-hidden="true" />

        {user ? <Navbar /> : null}

        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Avatar selection */}
          <Route
            path="/avatar"
            element={
              <ProtectedRoute>
                <AvatarSelect />
              </ProtectedRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <Dashboard />
                </AvatarGate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolios"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <Portfolios />
                </AvatarGate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolios/:id"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <PortfolioDetail />
                </AvatarGate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/crypto"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <Crypto />
                </AvatarGate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <Achievements />
                </AvatarGate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AvatarGate>
                  <Profile />
                </AvatarGate>
              </ProtectedRoute>
            }
          />

          {/* Defaults */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
