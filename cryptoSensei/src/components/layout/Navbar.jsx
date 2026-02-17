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
};