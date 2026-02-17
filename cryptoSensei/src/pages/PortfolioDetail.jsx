import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Wallet,
} from "lucide-react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, [id]);

  const fetchPortfolioData = async () => {
    try {
      const [portfolioRes, transactionsRes, pricesRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/portfolios/${id}`),
        axios.get(`http://localhost:3000/api/transactions/portfolio/${id}`),
        axios.get("http://localhost:3000/api/crypto/prices?perPage=50"),
      ]);

      setPortfolio(portfolioRes.data.data);
      setTransactions(transactionsRes.data.data);

      const pricesMap = {};
      pricesRes.data.data.forEach((coin) => {
        pricesMap[coin.symbol] = coin.currentPrice;
      });
      setCryptoPrices(pricesMap);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate portfolio performance over time
  const getPerformanceChartData = () => {
    const labels = [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Today",
    ];
    const data = transactions.slice(-7).map((tx) => tx.totalValue);

    return {
      labels,
      datasets: [
        {
          label: "Portfolio Value",
          data: data.length > 0 ? data : [0],
          borderColor: "rgb(108, 92, 231)",
          backgroundColor: "rgba(108, 92, 231, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-title text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-title text-red-400">Portfolio not found</p>
      </div>
    );
  }

  const totalValue =
    portfolio.cashBalance +
    portfolio.holdings.reduce(
      (sum, h) =>
        sum + h.quantity * (cryptoPrices[h.cryptoSymbol] || h.avgBuyPrice),
      0,
    );

  return (
    <div className="min-h-screen bg-grid-pattern pb-20">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/portfolios")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 font-title"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolios
        </button>

        <div className="game-card p-6 rounded-xl">
          <h1 className="text-3xl font-title mb-2">{portfolio.name}</h1>
          <p className="text-2xl font-gamer text-gradient">
            ${totalValue.toFixed(2)}
          </p>

          <div className="mt-6 h-64">
            <Line
              data={getPerformanceChartData()}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Cash Balance</p>
              <p className="text-xl font-title text-green-400">
                ${portfolio.cashBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Holdings</p>
              <p className="text-xl font-title text-neon-blue">
                {portfolio.holdings.length} Assets
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
