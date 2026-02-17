import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";

export default function Crypto() {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/crypto/prices?perPage=50",
      );
      setCryptos(response.data.data);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-grid-pattern pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-gamer text-gradient mb-8">
          CRYPTO MARKET
        </h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gamer-card border-2 border-gray-700 rounded-xl focus:border-gamer-accent outline-none font-body"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredCryptos.map((crypto, index) => (
            <motion.div
              key={crypto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="game-card p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-title">{crypto.name}</p>
                  <p className="text-sm text-gray-400">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-title">
                  ${crypto.currentPrice.toLocaleString()}
                </p>
                <div
                  className={`flex items-center gap-1 ${crypto.priceChangePercentage24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {crypto.priceChangePercentage24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {Math.abs(crypto.priceChangePercentage24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
