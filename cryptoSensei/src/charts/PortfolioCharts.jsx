import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Portfolio Value Over Time Chart
export const PortfolioValueChart = ({ data, isDark = true }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: "Portfolio Value",
        data: data.values || [],
        borderColor: "#00F0FF",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(0, 240, 255, 0.4)");
          gradient.addColorStop(1, "rgba(0, 240, 255, 0)");
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#00F0FF",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1E2749" : "#fff",
        titleColor: isDark ? "#fff" : "#0A0E27",
        bodyColor: isDark ? "#00F0FF" : "#0EA5E9",
        borderColor: "#00F0FF",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return (
              "$" +
              context.parsed.y.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            family: "Rajdhani, sans-serif",
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            family: "Rajdhani, sans-serif",
            size: 12,
          },
          callback: function (value) {
            return "$" + value.toLocaleString("en-US");
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full"
    >
      <Line ref={chartRef} data={chartData} options={options} />
    </motion.div>
  );
};

// Portfolio Allocation Doughnut Chart
export const PortfolioAllocationChart = ({ holdings, isDark = true }) => {
  const chartData = {
    labels: holdings?.map((h) => h.cryptoSymbol) || [],
    datasets: [
      {
        data: holdings?.map((h) => h.quantity * h.avgBuyPrice) || [],
        backgroundColor: [
          "#00F0FF", // Neon Cyan
          "#C471FF", // Neon Purple
          "#FF00E5", // Neon Pink
          "#FFE600", // Neon Yellow
          "#00FF85", // Neon Green
          "#F39C12", // Orange
          "#E74C3C", // Red
          "#3498DB", // Blue
        ],
        borderColor: isDark ? "#141B34" : "#fff",
        borderWidth: 3,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: isDark ? "#fff" : "#0A0E27",
          padding: 15,
          font: {
            family: "Rajdhani, sans-serif",
            size: 13,
            weight: "600",
          },
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1E2749" : "#fff",
        titleColor: isDark ? "#fff" : "#0A0E27",
        bodyColor: isDark ? "#00F0FF" : "#0EA5E9",
        borderColor: "#00F0FF",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full flex items-center justify-center"
    >
      {holdings && holdings.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div className="text-center text-gray-400 font-tech">
          <p>No holdings yet</p>
          <p className="text-sm mt-2">Start trading to see your allocation</p>
        </div>
      )}
    </motion.div>
  );
};

// Profit/Loss Bar Chart
export const ProfitLossChart = ({ transactions, isDark = true }) => {
  // Group transactions by day and calculate profit/loss
  const processedData =
    transactions?.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { profit: 0, loss: 0 };
      }

      if (transaction.type === "sell") {
        // Simplified profit calculation (would need buy price in real scenario)
        acc[date].profit += transaction.totalValue * 0.1; // Assuming 10% profit
      } else {
        acc[date].loss += transaction.totalValue;
      }

      return acc;
    }, {}) || {};

  const dates = Object.keys(processedData).slice(-7); // Last 7 days

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Profit",
        data: dates.map((date) => processedData[date].profit),
        backgroundColor: "rgba(0, 255, 133, 0.8)",
        borderColor: "#00FF85",
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: "Investment",
        data: dates.map((date) => processedData[date].loss),
        backgroundColor: "rgba(255, 0, 229, 0.8)",
        borderColor: "#FF00E5",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: isDark ? "#fff" : "#0A0E27",
          padding: 15,
          font: {
            family: "Rajdhani, sans-serif",
            size: 13,
            weight: "600",
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1E2749" : "#fff",
        titleColor: isDark ? "#fff" : "#0A0E27",
        bodyColor: isDark ? "#00F0FF" : "#0EA5E9",
        borderColor: "#00F0FF",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            return (
              context.dataset.label +
              ": $" +
              context.parsed.y.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            family: "Rajdhani, sans-serif",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            family: "Rajdhani, sans-serif",
            size: 12,
          },
          callback: function (value) {
            return "$" + value.toLocaleString("en-US");
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full"
    >
      {dates.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 font-tech">
          <p>No transaction data available</p>
        </div>
      )}
    </motion.div>
  );
};

// Crypto Price Line Chart
export const CryptoPriceChart = ({ priceHistory, coinName, isDark = true }) => {
  const chartData = {
    labels: priceHistory?.map((p) => p.date) || [],
    datasets: [
      {
        label: coinName || "Price",
        data: priceHistory?.map((p) => p.price) || [],
        borderColor: "#00F0FF",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(0, 240, 255, 0.3)");
          gradient.addColorStop(1, "rgba(0, 240, 255, 0)");
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#00F0FF",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1E2749" : "#fff",
        titleColor: isDark ? "#fff" : "#0A0E27",
        bodyColor: isDark ? "#00F0FF" : "#0EA5E9",
        borderColor: "#00F0FF",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return (
              "$" +
              context.parsed.y.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          maxTicksLimit: 6,
          font: {
            family: "Rajdhani, sans-serif",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            family: "Rajdhani, sans-serif",
            size: 12,
          },
          callback: function (value) {
            return "$" + value.toLocaleString("en-US");
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  );
};

export default {
  PortfolioValueChart,
  PortfolioAllocationChart,
  ProfitLossChart,
  CryptoPriceChart,
};
