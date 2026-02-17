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

const Dashboard = () => { }
