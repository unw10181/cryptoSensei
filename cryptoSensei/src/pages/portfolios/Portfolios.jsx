import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import PortfolioCard from "../../components/portfolio/PortfolioCard";

import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";

export default function Portfolios() {
  const listReq = useAsync(async () => {
    const res = await api.get(endpoints.portfolios.list);
    return res.data?.data || [];
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const create = async () => {
    await api.post(endpoints.portfolios.create, { name, description });
    setName("");
    setDescription("");
    await listReq.run();
  };

  if (listReq.loading) return <Loading label="LOADING PORTFOLIOS..." />;
  if (listReq.error)
    return <ErrorState message={listReq.error} onRetry={listReq.run} />;

  const items = listReq.data || [];

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          CREATE PORTFOLIO
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={create} disabled={!name.trim()}>
            CREATE
          </Button>
        </div>
      </Card>

      {items.length === 0 ? (
        <EmptyState
          title="NO PORTFOLIOS"
          message="Create your first portfolio to begin trading."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((p) => (
            <PortfolioCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
