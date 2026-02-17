import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  Award,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../common/Button";
import RankBadge from "../common/RankBadge";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Portfolios", path: "/portfolios", icon: Briefcase },
    { name: "Crypto", path: "/crypto", icon: TrendingUp },
    { name: "Achievements", path: "/achievements", icon: Award },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-gaming text-xl text-white group-hover:neon-text transition-all">
              CryptoSensei
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-4 py-2 rounded-lg font-tech
                      flex items-center gap-2 transition-all
                      ${
                        active
                          ? "bg-primary-500/20 text-neon-cyan"
                          : "text-gray-400 hover:text-white hover:bg-dark-elevated"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>

                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* XP Display */}
            <div className="flex items-center gap-2 px-3 py-1 bg-dark-elevated rounded-lg">
              <Zap className="w-4 h-4 text-neon-yellow" />
              <span className="text-sm font-gaming text-white">
                {user?.totalXP || 0} XP
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-elevated hover:bg-dark-border transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-neon-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-primary-600" />
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 px-3 py-1 bg-dark-elevated rounded-lg">
              <RankBadge rank={user?.rank} size="xs" />
              <span className="text-sm font-tech text-white">
                {user?.username}
              </span>
            </div>

            {/* Logout */}
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              icon={LogOut}
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-dark-elevated hover:bg-dark-border transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-border"
          >
            <div className="px-4 py-4 space-y-2">
              {/* User Info */}
              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <RankBadge rank={user?.rank} size="sm" />
                  <div>
                    <p className="font-gaming text-white text-sm">
                      {user?.username}
                    </p>
                    <p className="font-tech text-gray-400 text-xs">
                      {user?.totalXP || 0} XP
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-neon-yellow" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary-600" />
                  )}
                </button>
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg font-tech
                        transition-all
                        ${
                          active
                            ? "bg-primary-500/20 text-neon-cyan"
                            : "text-gray-400 hover:text-white hover:bg-dark-elevated"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-tech text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
