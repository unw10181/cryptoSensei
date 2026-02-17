import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  Award,
  PlusCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { portfolioAPI, transactionAPI, achievementAPI } from "../utils/api";
import LoadingScreen from "../components/common/LoadingScreen";
import StatsCard from "../components/common/StatsCard";
import RankBadge from "../components/common/RankBadge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import {
  PortfolioValueChart,
  PortfolioAllocationChart,
  ProfitLossChart,
} from "../components/charts/PortfolioCharts";
import { formatCurrency, formatRelativeTime } from "../utils/formatters";

const Dashboard = () => { 
    const { user } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [portfolios, setPortfolios] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [stats, setStats] = useState({
      totalValue: 0,
      totalProfit: 0,
      profitPercentage: 0,
      portfolioCount: 0,
    });
};

export default Dashboard;
