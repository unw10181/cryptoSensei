import { useCallback, useEffect, useState } from "react";

export function useAsync(asyncFn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(immediate);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError("");
    try {
      const res = await asyncFn(...args);
      setData(res);
      return res;
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Request failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!immediate) return;
    run();
  }, [run, immediate]);

  return { data, error, loading, run, setData };
}
