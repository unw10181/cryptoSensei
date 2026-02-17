export const fmtMoney = (n) => {
  const num = Number(n ?? 0);
  return num.toLocaleString(undefined, { style: "currency", currency: "USD" });
};

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
