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

    useEffect(() => {
      fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [portfoliosRes, transactionsRes, achievementsRes] =
          await Promise.all([
            portfolioAPI.getPortfolios(),
            transactionAPI.getAllUserTransactions(),
            achievementAPI.getUserAchievementProgress(),
          ]);

        if (portfoliosRes.success) {
          setPortfolios(portfoliosRes.data);

          // Calculate total portfolio value
          const totalValue = portfoliosRes.data.reduce((sum, p) => {
            const holdingsValue = p.holdings.reduce(
              (hSum, h) => hSum + h.quantity * h.avgBuyPrice,
              0,
            );
            return sum + p.cashBalance + holdingsValue;
          }, 0);

          setStats((prev) => ({
            ...prev,
            totalValue,
            portfolioCount: portfoliosRes.data.length,
          }));
        }

        if (transactionsRes.success) {
          setTransactions(transactionsRes.data.slice(0, 10)); // Last 10 transactions
        }

        if (achievementsRes.success) {
          const unlockedCount = achievementsRes.data.filter(
            (a) => a.isUnlocked,
          ).length;
          setAchievements(achievementsRes.data);
          setStats((prev) => ({
            ...prev,
            achievementsUnlocked: unlockedCount,
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Generate mock chart data (replace with real data)
    const chartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [10000, 10500, 10200, 11000, 10800, 11500, stats.totalValue],
    };

    if (loading) {
      return <LoadingScreen message="Loading your dashboard..." />;
    }

    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-gaming text-white mb-2">
                  <span className="neon-text">Welcome Back,</span>{" "}
                  <span className="text-neon-cyan">{user?.username}</span>
                </h1>
                <p className="text-gray-400 font-tech">
                  Ready to level up your trading game?
                </p>
              </div>

              {/* Rank Badge */}
              <RankBadge
                rank={user?.rank || "E-Rank"}
                size="lg"
                showProgress
                currentXP={user?.totalXP || 0}
              />
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Value"
              value={stats.totalValue}
              change={stats.profitPercentage}
              icon={Wallet}
              color="cyan"
              index={0}
            />
            <StatsCard
              title="Active Portfolios"
              value={stats.portfolioCount}
              change={0}
              icon={TrendingUp}
              color="purple"
              index={1}
            />
            <StatsCard
              title="Total XP"
              value={`${user?.totalXP || 0} XP`}
              change={5}
              changeType="percentage"
              icon={Sparkles}
              color="yellow"
              index={2}
            />
            <StatsCard
              title="Achievements"
              value={`${stats.achievementsUnlocked || 0}/${achievements.length}`}
              icon={Award}
              color="green"
              index={3}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Portfolio Value Chart */}
            <Card className="p-6">
              <Card.Header>
                <Card.Title>Portfolio Performance</Card.Title>
                <Card.Description>
                  Your total value over the last 7 days
                </Card.Description>
              </Card.Header>
              <Card.Content className="h-80">
                <PortfolioValueChart data={chartData} isDark={isDark} />
              </Card.Content>
            </Card>

            {/* Portfolio Allocation */}
            <Card className="p-6">
              <Card.Header>
                <Card.Title>Asset Allocation</Card.Title>
                <Card.Description>
                  Distribution across your holdings
                </Card.Description>
              </Card.Header>
              <Card.Content className="h-80">
                <PortfolioAllocationChart
                  holdings={portfolios.flatMap((p) => p.holdings)}
                  isDark={isDark}
                />
              </Card.Content>
            </Card>
          </div>

          {/* Profit/Loss Chart */}
          <Card className="p-6 mb-8">
            <Card.Header>
              <Card.Title>Trading Activity</Card.Title>
              <Card.Description>
                Profit and investment over the last week
              </Card.Description>
            </Card.Header>
            <Card.Content className="h-80">
              <ProfitLossChart transactions={transactions} isDark={isDark} />
            </Card.Content>
          </Card>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <Card.Header>
                <Card.Title>Quick Actions</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-3">
                <Button
                  fullWidth
                  icon={PlusCircle}
                  onClick={() => navigate("/portfolios")}
                >
                  Create New Portfolio
                </Button>
                <Button
                  fullWidth
                  variant="secondary"
                  icon={TrendingUp}
                  onClick={() => navigate("/crypto")}
                >
                  Browse Crypto Market
                </Button>
                <Button
                  fullWidth
                  variant="ghost"
                  icon={Award}
                  onClick={() => navigate("/achievements")}
                >
                  View Achievements
                </Button>
              </Card.Content>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title>Recent Transactions</Card.Title>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/portfolios")}
                    icon={ArrowRight}
                  >
                    View All
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((tx) => (
                      <motion.div
                        key={tx._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 bg-dark-elevated rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                          px-2 py-1 rounded text-xs font-gaming uppercase
                          ${
                            tx.type === "buy"
                              ? "bg-neon-green/20 text-neon-green"
                              : "bg-neon-pink/20 text-neon-pink"
                          }
                        `}
                          >
                            {tx.type}
                          </div>
                          <div>
                            <p className="font-tech text-white text-sm">
                              {tx.cryptoSymbol}
                            </p>
                            <p className="font-tech text-gray-400 text-xs">
                              {formatRelativeTime(tx.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-gaming text-white text-sm">
                            {formatCurrency(tx.totalValue)}
                          </p>
                          <p className="font-tech text-gray-400 text-xs">
                            {tx.quantity} coins
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 font-tech">
                    <p>No transactions yet</p>
                    <p className="text-sm mt-2">
                      Start trading to see your activity here
                    </p>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
