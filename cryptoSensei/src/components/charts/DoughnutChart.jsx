import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function makeColors(n) {
  const colors = [
    "rgba(0,240,255,0.85)", // cyan
    "rgba(255,0,229,0.75)", // pink
    "rgba(196,113,255,0.75)", // purple
    "rgba(34,197,94,0.75)", // green
    "rgba(250,204,21,0.75)", // yellow
    "rgba(59,130,246,0.75)", // blue
    "rgba(244,63,94,0.75)", // rose
    "rgba(255,159,64,0.75)", // orange
  ];

  // repeat if more slices than palette length
  return Array.from({ length: n }, (_, i) => colors[i % colors.length]);
}

export default function DoughnutChart({ labels, data, label = "Allocation" }) {
  const bg = makeColors(labels.length);

  return (
    <Doughnut
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        cutout: "62%",
      }}
      data={{
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: bg,
            borderColor: "rgba(255,255,255,0.12)",
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
