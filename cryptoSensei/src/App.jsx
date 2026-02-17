import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ui/ProtectedRoute";
import AppShell from "./components/layout/AppShell";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AvatarSelect from "./pages/onboarding/AvatarSelect";

import Dashboard from "./pages/dashboard/Dashboard";
import Portfolios from "./pages/portfolios/Portfolios";
import PortfolioDetail from "./pages/portfolios/PortfolioDetail";
import Market from "./pages/market/Market";
import CoinDetail from "./pages/market/CoinDetail";
import Achievements from "./pages/achievements/Achievements";
import Profile from "./pages/profile/Profile";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AvatarGate({ children }) {
  const { user } = useAuth();
  if (user && !user.avatar) return <Navigate to="/avatar" replace />;
  return children;
}

function Shell({ children }) {
  return <AppShell>{children}</AppShell>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
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

            {/* Onboarding */}
            <Route
              path="/avatar"
              element={
                <ProtectedRoute>
                  <Shell>
                    <AvatarSelect />
                  </Shell>
                </ProtectedRoute>
              }
            />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <Dashboard />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolios"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <Portfolios />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolios/:id"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <PortfolioDetail />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/market"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <Market />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/market/:coinId"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <CoinDetail />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <Achievements />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AvatarGate>
                    <Shell>
                      <Profile />
                    </Shell>
                  </AvatarGate>
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
