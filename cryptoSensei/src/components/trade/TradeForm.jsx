import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useDebounce } from "../../hooks/useDebounce";

export default function TradeForm({ portfolioId, onSubmit }) {
  const [type, setType] = useState("buy");

  // search + selection
  const [query, setQuery] = useState("bitcoin");
  const dQuery = useDebounce(query, 350);

  const [results, setResults] = useState([]);
  const [coinId, setCoinId] = useState("bitcoin");
  const [selected, setSelected] = useState({
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
  });

  // trade fields
  const [qty, setQty] = useState("0.01");
  const [price, setPrice] = useState("");

  // loading states
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load search results when query changes
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const term = dQuery.trim();
      if (!term) {
        setResults([]);
        return;
      }
      setLoadingSearch(true);
      try {
        const res = await api.get(
          `${endpoints.crypto.search}?query=${encodeURIComponent(term)}`,
        );
        const list = res.data?.data || [];
        if (!cancelled) setResults(list);
        // auto-select first result if current selection not in list
        if (
          !cancelled &&
          list.length > 0 &&
          !list.some((c) => c.id === coinId)
        ) {
          const first = list[0];
          setCoinId(first.id);
          setSelected({ id: first.id, name: first.name, symbol: first.symbol });
        }
      } catch (e) {
        if (!cancelled) {
          toast.error(
            e?.response?.data?.message || e?.message || "Search failed.",
          );
        }
      } finally {
        if (!cancelled) setLoadingSearch(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [dQuery]); // only debounced query

  // Fetch live price when coinId changes
  const fetchPrice = async () => {
    if (!coinId) return null;
    setLoadingPrice(true);
    try {
      const res = await api.get(endpoints.crypto.coinPrice(coinId));
      const p = res.data?.data?.currentPrice;
      if (p) setPrice(String(p));
      return p;
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
          e?.message ||
          "Price fetch failed (rate limited). Try again in 30–60 seconds.",
      );
      return null;
    } finally {
      setLoadingPrice(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);

  // Build options for select
  const selectOptions = useMemo(() => {
    // if results empty, keep current selection as option so select doesn't break
    if (!results || results.length === 0) {
      return [
        { id: selected.id, name: selected.name, symbol: selected.symbol },
      ];
    }
    return results;
  }, [results, selected]);

  const handleCoinChange = (id) => {
    setCoinId(id);
    const found = (results || []).find((c) => c.id === id);
    if (found)
      setSelected({ id: found.id, name: found.name, symbol: found.symbol });
  };

  const handleSubmit = async () => {
    if (!portfolioId) return toast.error("Missing portfolio id.");

    const quantity = Number(qty);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return toast.error("Quantity must be a positive number.");
    }

    let pricePerCoin = Number(price);

    // if price missing, fetch once at submit time
    if (!Number.isFinite(pricePerCoin) || pricePerCoin <= 0) {
      const fetched = await fetchPrice();
      pricePerCoin = Number(fetched);
    }

    if (!Number.isFinite(pricePerCoin) || pricePerCoin <= 0) {
      return toast.error(
        "Could not get a valid live price. Try again shortly.",
      );
    }

    try {
      setSubmitting(true);

      await onSubmit({
        portfolioId,
        type,
        cryptoSymbol: String(selected.symbol || "").toUpperCase(),
        cryptoName: selected.name,
        quantity,
        pricePerCoin,
        notes: `UI trade (${selected.id})`,
        coinId: selected.id, // optional (handy for charts later)
      });

      toast.success("Trade executed!");
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || "Trade failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Type
        </div>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="buy">buy</option>
          <option value="sell">sell</option>
        </Select>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Search Coin
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any coin (e.g. cardano, doge, xrp...)"
        />
        <div className="mt-2 text-xs text-slate-500">
          {loadingSearch ? "Searching..." : "Pick from results below."}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Select Coin
        </div>
        <Select
          value={coinId}
          onChange={(e) => handleCoinChange(e.target.value)}
        >
          {selectOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({String(c.symbol).toUpperCase()})
            </option>
          ))}
        </Select>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Quantity
        </div>
        <Input value={qty} onChange={(e) => setQty(e.target.value)} />
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
          Live Price (USD)
        </div>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className="text-xs text-primary-500 hover:underline"
            onClick={fetchPrice}
            disabled={loadingPrice}
          >
            Refresh price
          </button>
          {loadingPrice ? (
            <span className="text-xs text-slate-500">Fetching...</span>
          ) : null}
        </div>
      </div>

      <div className="md:col-span-2">
        <Button
          onClick={handleSubmit}
          className="w-full hover:shadow-neon"
          disabled={submitting || loadingPrice}
        >
          {submitting ? "EXECUTING..." : `EXECUTE ${type.toUpperCase()}`}
        </Button>
      </div>
    </div>
  );
}
