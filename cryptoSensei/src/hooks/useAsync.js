import { useCallback, useEffect, useState } from "react";

/**
 * useAsync(asyncFn, deps, options)
 * - Does NOT throw by default (prevents blank screens / unhandled rejections)
 * - If you want throwing behavior, set options.throwOnError = true
 */
export function useAsync(asyncFn, deps = [], options = {}) {
  const { immediate = true, throwOnError = false } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(immediate);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        const res = await asyncFn(...args);
        setData(res);
        return res;
      } catch (e) {
        const msg =
          e?.response?.data?.message || e?.message || "Request failed";
        setError(msg);
        if (throwOnError) throw e; // only throw when explicitly requested
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  useEffect(() => {
    if (!immediate) return;
    // Run safely; don't let promise rejection crash the route
    run().catch(() => {});
  }, [run, immediate]);

  return { data, error, loading, run, setData, setError };
}
