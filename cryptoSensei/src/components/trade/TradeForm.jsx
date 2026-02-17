import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function TradeForm({ portfolioId, onSubmit }) {
  const [type, setType] = useState("buy");
  const [coinId, setCoinId] = useState("bitcoin");
  const [symbol, setSymbol] = useState("BTC");
  const [name, setName] = useState("Bitcoin");
  const [qty, setQty] = useState("0.01");
  const [price, setPrice] = useState("0");

  const submit = async () => {
    await onSubmit({
      portfolioId,
      type,
      cryptoSymbol: symbol,
      cryptoName: name,
      quantity: Number(qty),
      pricePerCoin: Number(price),
      notes: `Placed via UI (${coinId})`,
    });
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
          Quick Coin
        </div>
        <Select
          value={coinId}
          onChange={(e) => {
            const v = e.target.value;
            setCoinId(v);
            if (v === "bitcoin") {
              setSymbol("BTC");
              setName("Bitcoin");
            }
            if (v === "ethereum") {
              setSymbol("ETH");
              setName("Ethereum");
            }
            if (v === "solana") {
              setSymbol("SOL");
              setName("Solana");
            }
          }}
        >
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereum</option>
          <option value="solana">solana</option>
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
          Price Per Coin (USD)
        </div>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className="md:col-span-2">
        <Button onClick={submit} className="w-full">
          EXECUTE TRADE
        </Button>
      </div>
    </div>
  );
}
