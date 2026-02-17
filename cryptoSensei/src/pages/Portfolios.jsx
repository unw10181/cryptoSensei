import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CreatePortfolioModal from "../components/portfolio/CreatePortfolioModal";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState({});

  useEffect(() => {
    fetchPortfolios();
    fetchCryptoPrices();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/portfolios");
      setPortfolios(response.data.data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/crypto/prices?perPage=50",
      );
      const pricesMap = {};
      response.data.data.forEach((coin) => {
        pricesMap[coin.symbol] = coin.currentPrice;
      });
      setCryptoPrices(pricesMap);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  const calculatePortfolioValue = (portfolio) => {
    let totalValue = portfolio.cashBalance;
    portfolio.holdings?.forEach((holding) => {
      const currentPrice =
        cryptoPrices[holding.cryptoSymbol] || holding.avgBuyPrice;
      totalValue += holding.quantity * currentPrice;
    });
    return totalValue;
  };

  const calculatePortfolioChange = (portfolio) => {
    const costBasis =
      portfolio.holdings?.reduce(
        (sum, h) => sum + h.quantity * h.avgBuyPrice,
        0,
      ) || 0;
    const currentValue =
      portfolio.holdings?.reduce(
        (sum, h) =>
          sum + h.quantity * (cryptoPrices[h.cryptoSymbol] || h.avgBuyPrice),
        0,
      ) || 0;

    if (costBasis === 0) return 0;
    return ((currentValue - costBasis) / costBasis) * 100;
  };

  const getPortfolioDoughnutData = (portfolio) => {
    const labels = [
      "Cash",
      ...(portfolio.holdings?.map((h) => h.cryptoSymbol) || []),
    ];
    const data = [
      portfolio.cashBalance,
      ...(portfolio.holdings?.map(
        (h) => h.quantity * (cryptoPrices[h.cryptoSymbol] || h.avgBuyPrice),
      ) || []),
    ];
    const backgroundColors = [
      "rgba(0, 184, 148, 0.8)",
      "rgba(108, 92, 231, 0.8)",
      "rgba(0, 212, 255, 0.8)",
      "rgba(180, 0, 255, 0.8)",
      "rgba(255, 0, 255, 0.8)",
      "rgba(0, 255, 136, 0.8)",
      "rgba(255, 237, 0, 0.8)",
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: "#1a1f3a",
          borderWidth: 3,
          hoverOffset: 10,
        },
      ],
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9ca3af",
          padding: 15,
          font: {
            size: 12,
            family: "Rajdhani, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(26, 31, 58, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgb(108, 92, 231)",
        borderWidth: 2,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-gamer-accent animate-pulse mx-auto mb-4" />
          <p className="font-title text-gray-400">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-gamer text-gradient mb-2">
              PORTFOLIOS
            </h1>
            <p className="text-gray-400 font-body">
              Manage your virtual crypto portfolios
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 retro-btn px-6 py-3 rounded-xl font-title flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Portfolio
          </motion.button>
        </motion.div>

        {/* Portfolios Grid */}
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {portfolios.map((portfolio, index) => {
              const totalValue = calculatePortfolioValue(portfolio);
              const change = calculatePortfolioChange(portfolio);
              const isPositive = change >= 0;

              return (
                <motion.div
                  key={portfolio._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Link to={`/portfolios/${portfolio._id}`}>
                    <div className="game-card p-6 rounded-xl h-full hover:scale-105 transition-transform">
                      {/* Portfolio Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-title text-white mb-2">
                            {portfolio.name}
                          </h2>
                          {portfolio.description && (
                            <p className="text-sm text-gray-400">
                              {portfolio.description}
                            </p>
                          )}
                        </div>
                        <div className="p-3 rounded-lg bg-gamer-accent/20">
                          <Wallet className="w-6 h-6 text-gamer-accent" />
                        </div>
                      </div>

                      {/* Portfolio Value */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-1">
                          Total Value
                        </p>
                        <div className="flex items-baseline gap-3">
                          <p className="text-3xl font-gamer text-white">
                            ${totalValue.toFixed(2)}
                          </p>
                          <div
                            className={`
                            flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-title
                            ${isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
                          `}
                          >
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {Math.abs(change).toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      {/* Portfolio Composition Chart */}
                      {portfolio.holdings && portfolio.holdings.length > 0 ? (
                        <div className="mb-6">
                          <div className="h-48">
                            <Doughnut
                              data={getPortfolioDoughnutData(portfolio)}
                              options={doughnutOptions}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 flex items-center justify-center bg-gamer-bg rounded-lg mb-6">
                          <p className="text-gray-400 text-sm">
                            No holdings yet
                          </p>
                        </div>
                      )}

                      {/* Portfolio Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            Cash Balance
                          </p>
                          <p className="font-title text-green-400">
                            ${portfolio.cashBalance.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Holdings</p>
                          <p className="font-title text-neon-blue">
                            {portfolio.holdings?.length || 0} Assets
                          </p>
                        </div>
                      </div>

                      {/* View Details Link */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex items-center justify-between text-gamer-accent hover:text-neon-purple transition-colors">
                          <span className="font-title text-sm">
                            View Details
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="game-card p-12 rounded-xl max-w-md mx-auto">
              <Wallet className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-title mb-4">No Portfolios Yet</h2>
              <p className="text-gray-400 mb-8 font-body">
                Create your first portfolio to start your crypto trading
                journey!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="retro-btn px-8 py-4 rounded-xl font-title flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create Your First Portfolio
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <CreatePortfolioModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchPortfolios();
          }}
        />
      )}
    </div>
  );
}
