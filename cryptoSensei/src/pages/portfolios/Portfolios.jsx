import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";

import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";

export default function Portfolios() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [startingCash, setStartingCash] = useState("10000");
  const [description, setDescription] = useState("");

  const listReq = useAsync(async () => {
    const res = await api.get(endpoints.portfolios.list);
    return res.data?.data || [];
  }, []);

  // ✅ IMPORTANT: accept payload as arg (no stale closure)
  const createReq = useAsync(
    async (payload) => {
      const res = await api.post(endpoints.portfolios.create, payload);
      return res.data?.data;
    },
    [],
    { immediate: false },
  );

  const delReq = useAsync(
    async (portfolioId) => {
      const res = await api.delete(endpoints.portfolios.one(portfolioId));
      return res.data;
    },
    [],
    { immediate: false },
  );

  const createPortfolio = async (e) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Portfolio name is required.");
      return;
    }

    const cash = Number(startingCash);
    if (!Number.isFinite(cash) || cash <= 0) {
      toast.error("Starting cash must be a valid number.");
      return;
    }

    const payload = {
      name: trimmed,
      startingCash: cash,
      description: description.trim(),
    };

    const t = toast.loading("Creating portfolio...");
    const created = await createReq.run(payload);
    toast.dismiss(t);

    if (!created) return;

    toast.success("Portfolio created!");
    setName("");
    setStartingCash("10000");
    setDescription("");

    await listReq.run();
    nav(`/portfolios/${created._id}`);
  };

  const deletePortfolio = async (portfolioId, portfolioName) => {
    const ok = window.confirm(`Delete portfolio "${portfolioName}"?`);
    if (!ok) return;

    const t = toast.loading("Deleting portfolio...");
    const res = await delReq.run(portfolioId);
    toast.dismiss(t);

    if (!res) return;

    toast.success("Portfolio deleted.");
    await listReq.run();
  };

  if (listReq.loading) return <Loading label="LOADING PORTFOLIOS..." />;
  if (listReq.error)
    return <ErrorState message={listReq.error} onRetry={listReq.run} />;

  const portfolios = listReq.data || [];

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          PORTFOLIOS
        </div>

        <form
          onSubmit={createPortfolio}
          className="mt-4 grid md:grid-cols-3 gap-3"
        >
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              Portfolio Name
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shadow Monarch Fund"
              autoComplete="off"
            />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              Starting Cash
            </div>
            <Input
              value={startingCash}
              onChange={(e) => setStartingCash(e.target.value)}
              placeholder="10000"
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              Description (optional)
            </div>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Strategy notes, goals, etc."
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-3">
            <Button
              className="w-full hover:shadow-neon"
              disabled={createReq.loading}
            >
              {createReq.loading ? "CREATING..." : "CREATE PORTFOLIO"}
            </Button>
          </div>
        </form>
      </Card>

      {portfolios.length === 0 ? (
        <EmptyState
          title="NO PORTFOLIOS"
          message="Create your first portfolio to begin trading."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((p) => (
            <Card
              key={p._id}
              className="p-5 hover:shadow-neon transition"
              data-aos="fade-up"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Cash: ${Number(p.cashBalance ?? 0).toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => deletePortfolio(p._id, p.name)}
                  disabled={delReq.loading}
                >
                  DELETE
                </button>
              </div>

              <div className="mt-4">
                <Link to={`/portfolios/${p._id}`}>
                  <Button className="w-full">OPEN</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
